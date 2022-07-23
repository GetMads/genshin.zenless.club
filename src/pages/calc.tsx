import type { FunctionComponent } from "react";

import { useAtom } from "jotai";
import useTranslation from "next-translate/useTranslation";

import {
  critDamageAtom,
  critRateAtom,
  critValueAtom,
  resinCurrentAtom,
  resinNeededAtom,
  resinReplenishTimeAtom,
  resinTimeDeltaAtom,
} from "@/atoms/calculator";
import { CalculatorDetails } from "@/components/calculator/CalculatorDetails";
import { CalculatorInput } from "@/components/calculator/CalculatorInput";
import { CalculatorResult } from "@/components/calculator/CalculatorResult";
import { CalculatorRoot } from "@/components/calculator/CalculatorRoot";
import { CalculatorTitle } from "@/components/calculator/CalculatorTitle";
import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";

const CrtitValueCalculator: FunctionComponent = () => {
  const [critRate, setCritRate] = useAtom(critRateAtom);
  const [critDmg, setCritDmg] = useAtom(critDamageAtom);
  const [critValue] = useAtom(critValueAtom);

  return (
    <CalculatorRoot className="overflow-y-auto break-inside-avoid">
      <CalculatorTitle>Crit Value</CalculatorTitle>
      <CalculatorDetails>Provide your stats details</CalculatorDetails>
      <CalculatorInput
        value={critRate}
        setValue={setCritRate}
        step={0.1}
        placeholder="Artifact's crit rate"
      />
      <CalculatorInput
        value={critDmg}
        setValue={setCritDmg}
        step={0.1}
        placeholder="Artifact's crit damage"
        className="mt-2"
      />

      {critRate > 0 && critDmg > 0 && (
        <CalculatorResult>
          Crit Value is{" "}
          <span className="text-primary-500 dark:text-primary-400 font-semibold">{critValue}</span>
        </CalculatorResult>
      )}
    </CalculatorRoot>
  );
};

const ResinCalculator: FunctionComponent = () => {
  const [resinCurrent, setResinCurrent] = useAtom(resinCurrentAtom);
  const [resinNeeded, setResinNeeded] = useAtom(resinNeededAtom);
  const [resinDelta] = useAtom(resinTimeDeltaAtom);
  const [resinReplenishTime] = useAtom(resinReplenishTimeAtom);

  return (
    <CalculatorRoot className="overflow-y-auto break-inside-avoid">
      <CalculatorTitle>Resin</CalculatorTitle>
      <CalculatorDetails>Find out when you&apos;ll be able to farm</CalculatorDetails>
      <CalculatorInput
        value={resinCurrent}
        setValue={setResinCurrent}
        placeholder="How much resin you have"
      />
      <CalculatorInput
        value={resinNeeded}
        setValue={setResinNeeded}
        placeholder="How much resin you need"
        className="mt-2"
      />

      {resinDelta > 0 && (
        <CalculatorResult>
          You will have{" "}
          <span className="text-primary-500 dark:text-primary-400 font-semibold">
            {resinNeeded}
          </span>{" "}
          at{" "}
          <span className="text-primary-500 dark:text-primary-400 font-semibold">
            {resinReplenishTime.format("lll")}
          </span>
        </CalculatorResult>
      )}
    </CalculatorRoot>
  );
};

const CalcPage = () => {
  const { t } = useTranslation();

  return (
    <Layout title={t("common:calculators")} description={t("meta:calculators.description")}>
      <Container>
        <div className="columns-1 md:columns-2 gap-4 space-y-4">
          <CrtitValueCalculator />
          <ResinCalculator />
        </div>
      </Container>
    </Layout>
  );
};

export default CalcPage;
