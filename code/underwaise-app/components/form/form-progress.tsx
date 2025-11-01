import { FormValues, Section } from "@/types";
import { useMemo, useState } from "react";

const calculateFormCompletion = (
  values: FormValues,
  sections: Section[],
  currentStep: number
): number => {
  // Get all fields from completed steps + current step
  const totalSteps = sections.length;
  const completedSteps = currentStep;
  const currentStepFields = sections[currentStep]?.fields || [];

  // Calculate base progress from completed steps
  const baseProgress = (completedSteps / totalSteps) * 100;

  // Calculate progress within current step
  let currentStepProgress = 0;
  if (currentStepFields.length > 0) {
    const currentStepFilledFields = currentStepFields.filter((field) => {
      const fieldValue = values[field.id as keyof FormValues];

      if (typeof fieldValue === "boolean") return fieldValue !== undefined;
      if (typeof fieldValue === "string") return fieldValue.trim().length > 0;
      if (typeof fieldValue === "number")
        return fieldValue !== undefined && fieldValue !== 0;
      return false;
    });

    currentStepProgress =
      (currentStepFilledFields.length / currentStepFields.length) *
      (100 / totalSteps);
  }

  const totalProgress = baseProgress + currentStepProgress;
  return Math.min(Math.round(totalProgress), 100);
};

export default function FormProgress({
  step,
  sections,
  form,
}: {
  step: number;
  sections: Section[];
  form: any;
}) {
  const watchedValues = form.watch();

  const completionPercentage = useMemo(() => {
    return calculateFormCompletion(watchedValues, sections, step);
  }, [watchedValues, sections, step]);

  return (
    <div className="form-progress">
      <div
        className="progress-indicator"
        style={{ width: `${completionPercentage}%` }}
      />
    </div>
  );
}
