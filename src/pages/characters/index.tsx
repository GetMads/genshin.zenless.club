import type { NextPage } from "next";
import type { ChangeEvent } from "react";

import { useAtom } from "jotai";
import useTranslation from "next-translate/useTranslation";

import { characterSearchAtom } from "@/atoms/characterSearch";
import { CharacterCard } from "@/components/cards/CharacterCard";
import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { charactersArray } from "@/data/characters";

const CharactersIndex: NextPage = () => {
  const [search, setSearch] = useAtom(characterSearchAtom);

  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Layout title={t("common:characters")} description={t("meta:characters.home.description")}>
      <Container>
        <div className="mb-6 flex flex-col gap-4 lg:flex-row">
          <Input placeholder={t`common:search-by-name`} onChange={handleChange} value={search} />
        </div>

        <div className="flex flex-row flex-wrap justify-evenly gap-4 md:justify-start">
          {charactersArray.map((character) => (
            <CharacterCard
              className={
                character.name.toLowerCase().includes(search.toLowerCase()) ? "" : "hidden"
              }
              key={character.id}
              character={character}
            />
          ))}
        </div>
      </Container>
    </Layout>
  );
};

export default CharactersIndex;
