"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import {
  Section,
  Field,
  FormValues,
  HealthCondition,
  Medication,
  Incapacity,
} from "@/types";
import "./life-star-form.style.scss";
import { FormFieldWrapper } from "./form-field-wrapper";
import { BooleanField } from "./boolean-field";
import { apiClient } from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MedicationPeriodicity } from "@/enum";

interface Props {
  sections: Section[];
}

const postApplication = async (data: FormValues) => {
  const res = await apiClient.post("/application/submit", data);
  return res.data;
};

const postCaptcha = async (token: string) => {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recaptchaResponse: token }),
  });
  return await res.json();
};

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;

export function MultiStepForm({ sections }: Props) {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [isCaptchaGettingReady, setIsCaptchaGettingReady] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      email: "",
      height: "",
      weight: "",

      isSmoker: false,
      isDrugUser: false,
      hasSpecialSports: false,
      specialSportActivities: "",

      physicalHealthConditions: [
        {
          startDate: "",
          endDate: "",
          reason: "",
          isTreatmentCompleted: false,
          treatmentFacilityAddress: "",
        },
      ],
      mentalHealthConditions: [
        {
          startDate: "",
          endDate: "",
          reason: "",
          isTreatmentCompleted: false,
          treatmentFacilityAddress: "",
        },
      ],

      medicationForm: [
        {
          startDate: "",
          endDate: "",
          reason: "",
          isTreatmentCompleted: false,
          medicationNameAndDosage: "",
          medicationPeriodicity: MedicationPeriodicity.AS_NEEDED,
        },
      ],

      incapacityForm: [
        {
          startDate: "",
          endDate: "",
          reason: "",
          isTreatmentCompleted: false,
        },
      ],
    },
    mode: "onTouched",
  });
  const currentStep = sections[step];

  const { mutate: submitApplication, isPending } = useMutation({
    mutationFn: postApplication,
    onSuccess: (data) => {
      console.log(data);
      router.push("/spar-lebensversicherung/thank-you");
    },
    onError: () => {
      toast.error("There was an error submitting your application.");
    },
  });

  const { mutate: submitCaptcha, isPending: isCaptchaPending } = useMutation({
    mutationFn: postCaptcha,
    onError: () => {
      toast.error("There was an error verifying the captcha.");
    },
  });

  const sanitizeArrayWithEndDate = (
    array: HealthCondition[] | Medication[] | Incapacity[]
  ): HealthCondition[] | Medication[] | Incapacity[] => {
    return array.map((item) => ({
      ...item,
      endDate: item.endDate === "" ? null : item.endDate,
    }));
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (step < sections.length - 1) {
      setStep(step + 1);
    } else {
      try {
        setIsCaptchaGettingReady(true);
        (window as any).grecaptcha.ready(() => {
          (window as any).grecaptcha
            .execute(SITE_KEY, { action: "submit" })
            .then(async (token: string) => {
              submitCaptcha(token, {
                onSuccess: (captchaResponse) => {
                  const output: FormValues & { captcha: string } = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    birthDate: data.birthDate,
                    email: data.email,
                    height: data.height,
                    weight: data.weight,

                    isSmoker: data.isSmoker,
                    isDrugUser: data.isDrugUser,
                    hasSpecialSports: data.hasSpecialSports,

                    specialSportActivities: data.hasSpecialSports
                      ? data.specialSportActivities
                      : "",

                    physicalHealthConditions: data.hasPhysicalHealthConditions
                      ? (sanitizeArrayWithEndDate(
                          data.physicalHealthConditions
                        ) as HealthCondition[])
                      : [],

                    mentalHealthConditions: data.hasMentalHealthConditions
                      ? (sanitizeArrayWithEndDate(
                          data.mentalHealthConditions
                        ) as HealthCondition[])
                      : [],

                    medicationForm: data.hasMedicationUsage
                      ? (sanitizeArrayWithEndDate(
                          data.medicationForm
                        ) as Medication[])
                      : [],

                    incapacityForm: data.hasIncapacity
                      ? (sanitizeArrayWithEndDate(
                          data.incapacityForm
                        ) as Incapacity[])
                      : [],

                    captcha: captchaResponse,
                  };
                  console.log("Structured form output:", output);
                  submitApplication(output);
                },
              });
            });
        });
      } catch {
        toast.error("There was an error preparing the captcha.");
      } finally {
        setIsCaptchaGettingReady(false);
      }
    }
  };

  const renderField = (field: Field) => {
    if (["text", "email", "number", "date", "textarea"].includes(field.type)) {
      return (
        <FormFieldWrapper
          key={field.id}
          name={field.id}
          {...field}
          control={form.control}
        />
      );
    }

    if (field.type === "boolean") {
      return (
        <div key={field.id} className="space-y-4">
          <BooleanField
            key={field.id}
            name={field.id}
            question={field.question}
            followUp={field.followUp?.fields?.map((subField) => (
              <FormFieldWrapper
                key={subField.id}
                name={subField.id}
                required={subField.required}
                {...subField}
                control={form.control}
              />
            ))}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="form-container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h2 className="section-heading">{currentStep.title}</h2>

          {currentStep.fields.map(renderField)}

          <div className="form-actions">
            <div className="wrapper">
              {step > 0 && (
                <Button
                  type="button"
                  size="lg"
                  className="secondary-action"
                  variant="secondary"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </Button>
              )}
              <Button
                size="lg"
                className="primary-action"
                type="submit"
                variant="default"
                disabled={
                  isCaptchaGettingReady ||
                  isPending ||
                  isCaptchaPending ||
                  !form.formState.isValid
                }
              >
                {step === sections.length - 1 ? "Submit" : "Next"}
                {isCaptchaGettingReady || isPending || isCaptchaPending
                  ? "..."
                  : ""}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
