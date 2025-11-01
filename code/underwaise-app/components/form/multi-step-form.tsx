// app/components/MultiStepForm.tsx
"use client";

import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import "./life-star-form.style.scss";
import Link from "next/link";
import { ButtonGroup } from "../ui/button-group";
import { Section } from "@/types";

interface Props {
  sections: Section[];
}

type FormValue = Record<
  string,
  number | string | readonly string[] | undefined
>;

export function MultiStepForm({ sections }: Props) {
  const [step, setStep] = useState(0);
  const form = useForm<FormValue>({ defaultValues: {} });
  const { handleSubmit, register, watch, control } = form;

  const currentStep = sections[step];

  const onSubmit = (data: FormValue) => {
    if (step < sections.length - 1) {
      setStep(step + 1);
    } else {
      console.log("Form data:", data);
      alert("Form submitted! Check console for data.");
    }
  };

  return (
    <div className="form-container">
      {/* <div className="form-progress">
        <div
          className="progress-indicator"
          style={{ width: `${completionPercentage}%` }}
        />
      </div> */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="section-heading">{currentStep.title}</h2>
          {currentStep.fields.map((field) => {
            if (
              field.type === "text" ||
              field.type === "email" ||
              field.type === "date" ||
              field.type === "number"
            ) {
              return (
                <div key={field.id} className="grid gap-2">
                  {field.label && (
                    <Label className="form-label" htmlFor={field.id}>
                      {field.label}
                    </Label>
                  )}
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(field.id, { required: field.required })}
                  />
                  {field.helperText && (
                    <p className="text-sm text-gray-500 text-xs">
                      {field.helperText}
                    </p>
                  )}
                </div>
              );
            }

            if (field.type === "boolean") {
              // watch the value for dynamic follow-up fields
              const watchField = watch(field.id);

              return (
                <div key={field.id} className="space-y-4 gap-2">
                  <Controller
                    name={field.id}
                    control={form.control}
                    render={({ field: controllerField }) => (
                      <FormItem>
                        {field.question && (
                          <h3 className="question">{field.question}</h3>
                        )}
                        {field.label && (
                          <FormLabel className="form-label">
                            {field.label}
                          </FormLabel>
                        )}
                        <FormControl>
                          <ButtonGroup className="w-full">
                            <Button
                              size="lg"
                              variant={
                                controllerField.value ? "default" : "secondary"
                              }
                              onClick={() => controllerField.onChange(true)}
                              type="button"
                              className="w-1/2"
                            >
                              Yes
                            </Button>
                            <Button
                              size="lg"
                              variant={
                                !controllerField.value ? "default" : "secondary"
                              }
                              onClick={() => controllerField.onChange(false)}
                              type="button"
                              className="w-1/2"
                            >
                              No
                            </Button>
                          </ButtonGroup>
                        </FormControl>
                        <FormMessage className="text-xs mt-1.5" />
                      </FormItem>
                    )}
                  />
                  {field.followUp?.fields && watchField && (
                    <div className="space-y-2 mt-12">
                      {field.followUp.fields.map((subField) => (
                        <Controller
                          key={subField.id}
                          name={subField.id}
                          control={form.control}
                          render={({ field: subController }) => (
                            <FormItem>
                              <FormLabel className="form-label">
                                {subField.label}
                              </FormLabel>
                              <FormControl>
                                {subField.type === "textarea" ? (
                                  <Textarea
                                    {...subController}
                                    className="min-h-40"
                                    defaultValue=""
                                  />
                                ) : (
                                  <Input
                                    type={subField.type}
                                    defaultValue=""
                                    {...subController}
                                  />
                                )}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            }
          })}
          {/* 

            

            return null;
          })} */}

          <div className="form-actions">
            <div className="wrapper">
              {step > 0 && (
                <Button
                  size="lg"
                  variant="secondary"
                  className="secondary-action"
                  type="button"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </Button>
              )}
              <Button
                size="lg"
                variant="default"
                type="submit"
                className="primary-action"
                // disabled={isPending || !form.formState.isValid}
                // disabled={!form.formState.isValid}
              >
                {step === sections.length - 1 ? "Submit" : "Next"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
