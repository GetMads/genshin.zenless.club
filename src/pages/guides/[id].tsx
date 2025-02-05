import type { CharacterType } from "@/data/character";
import type { MetaType } from "@/data/guides/meta.schema";
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import useTranslation from "next-translate/useTranslation";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/Container";
import { ContentsTable } from "@/components/ContentsTable";
import { Layout } from "@/components/Layout";
import { getCharacterById } from "@/data/characters";
import { publishedIds } from "@/data/guides/published";
import { characterIcon } from "@/lib/helpers";
import { getGuide } from "@/lib/markdownTools";

interface StaticProps {
  meta: MetaType;
  html: string;
  character: CharacterType;
}

const GuidesId = ({ html, character }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();

  const [headings, setHeadings] = useState<string[]>([]);
  const contentRoot = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = contentRoot.current;

    if (el != null && headings.length <= 0) {
      const headings = Array.from(el.children)
        .filter((el) => el instanceof HTMLHeadingElement && el.getAttribute("id") != null)
        .reduce((acc, el) => {
          const id = el.getAttribute("id");

          const validArr = [...acc];
          if (id != null) {
            validArr.push(id);
          }

          return validArr;
        }, new Array<string>());

      setHeadings(headings);
    }
  }, [contentRoot]);

  return (
    <Layout
      title={t("meta:guides.id.title", { name: character.name })}
      description={t("meta:guides.id.description", { name: character.name })}
      iconURL={characterIcon(character.id)}
      color={`${character.accentColor}`}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto]">
          <section
            ref={contentRoot}
            className="md-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <ContentsTable title="Guide Contents" headings={headings} />
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  let paths = publishedIds.map((id) => ({ params: { id } }));

  if (typeof locales !== "undefined") {
    paths = locales.flatMap((locale) => {
      return paths.map((path) => {
        return {
          ...path,
          locale,
        };
      });
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async ({ params, locale = "en" }) => {
  const paramsId = params?.id?.toString().toLowerCase();
  if (typeof paramsId === "undefined") {
    return { notFound: true };
  }

  if (!publishedIds.includes(paramsId)) {
    return { notFound: true };
  }

  const character = getCharacterById(paramsId);
  if (character == null) {
    return { notFound: true };
  }

  const guide = await getGuide(paramsId, locale);

  return {
    props: { ...guide, character },
  };
};

export default GuidesId;
