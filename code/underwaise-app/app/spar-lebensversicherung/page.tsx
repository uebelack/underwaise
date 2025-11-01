import { LifeStarForm } from "@/components/form/life-start-form";
import { MultiStepForm } from "@/components/form/multi-step-form";
import schema from "@/components/form/data.json";
import { Section } from "@/types";

export default function Form() {
  const sections = schema.sections as Section[];

  // return <LifeStarForm />;
  return <MultiStepForm sections={sections} />;
}
