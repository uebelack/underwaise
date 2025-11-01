"use client";

import { FC } from "react";
import { Control } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { BooleanField } from "./boolean-field";
import { Field } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  type: string;
  control: Control<any>;
  required?: boolean;
  min?: number;
  max?: number;
  helperText?: string;
  options?: Field["options"];
  defaultValue?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export const FormFieldWrapper: FC<Props> = ({
  name = "",
  label,
  type,
  placeholder,
  control,
  required,
  min,
  max,
  helperText,
  options,
  defaultValue,
  prefix,
  suffix,
}) => (
  <FormField
    control={control}
    name={name}
    rules={{
      required,
      min,
      max,
      pattern: type === "email" ? /^\S+@\S+$/i : undefined,
    }}
    render={({ field, fieldState }) => (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          {type === "textarea" ? (
            <Textarea {...field} placeholder={placeholder} />
          ) : type == "boolean" ? (
            <BooleanField name={name} />
          ) : type === "select" ? (
            <Select
              defaultValue={defaultValue}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Options</SelectLabel>
                  {options &&
                    options.map((option) => (
                      <SelectItem
                        key={`select-${field.name}-${option.value}`}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : prefix || suffix ? (
            <InputGroup
              className={
                fieldState.error
                  ? "border-destructive focus-within:ring-destructive"
                  : ""
              }
            >
              {prefix && (
                <InputGroupAddon>
                  {typeof prefix === "string" ? (
                    <InputGroupText>{prefix}</InputGroupText>
                  ) : (
                    prefix
                  )}
                </InputGroupAddon>
              )}
              <InputGroupInput
                type={type}
                placeholder={placeholder}
                {...field}
                className={
                  fieldState.error
                    ? "border-destructive focus:ring-destructive"
                    : ""
                }
              />
              {suffix && (
                <InputGroupAddon align="inline-end">
                  {typeof suffix === "string" ? (
                    <InputGroupText>{suffix}</InputGroupText>
                  ) : (
                    suffix
                  )}
                </InputGroupAddon>
              )}
            </InputGroup>
          ) : (
            <Input
              {...field}
              type={type}
              max={type === "date" ? max : undefined}
              min={type === "date" ? min : undefined}
              placeholder={placeholder}
            />
          )}
        </FormControl>
        {helperText && <p className="text-sm text-gray-500">{helperText}</p>}
        <FormMessage />
      </FormItem>
    )}
  />
);
