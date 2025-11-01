"use client";

import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { FormField, FormItem, FormControl, FormMessage } from "../ui/form";

interface Props {
  name: string;
  question?: string;
  followUp?: React.ReactNode;
  defaultValue?: string;
}

export const BooleanField: FC<Props> = ({
  name,
  question,
  followUp,
  defaultValue = false,
}) => {
  const { control, watch } = useFormContext();
  const value = watch(name);

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <FormItem>
            {question && <h3 className="question">{question}</h3>}
            <FormControl>
              <ButtonGroup className="w-full">
                <Button
                  type="button"
                  size="lg"
                  className="w-1/2"
                  variant={field.value === true ? "default" : "secondary"}
                  onClick={() => field.onChange(true)}
                >
                  Yes
                </Button>
                <Button
                  type="button"
                  size="lg"
                  className="w-1/2"
                  variant={field.value === false ? "default" : "secondary"}
                  onClick={() => field.onChange(false)}
                >
                  No
                </Button>
              </ButtonGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {followUp && value && <div className="mt-4 space-y-2">{followUp}</div>}
    </div>
  );
};
