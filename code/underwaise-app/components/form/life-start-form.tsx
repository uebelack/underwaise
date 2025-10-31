"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formSchema } from "@/schemas/form-schema";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./life-star-form.style.scss";
import { ButtonGroup } from "../ui/button-group";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const postApplication = async (data: z.infer<typeof formSchema>) => {
  const res = await apiClient.post("/application/submit", data);
  return res.data;
};

type FormValues = z.infer<typeof formSchema>;

export function LifeStarForm() {
  const router = useRouter();
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      smoker: false,
      hobbies: "",
      healthConditions: "",
    },
  });

  const mutation = useMutation({
    mutationFn: postApplication,
    onSuccess: () => {
      router.push("/lifestar/thank-you");
    },
    onError: () => {
      console.log("ERROR");
      setSubmitStatus("error");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutation.mutate(values);
  }

  return (
    <div className="form-container">
      <h2>TBD</h2>
      <p className="subtitle">Please fill out the form with your information</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name *</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Input placeholder="John" {...field} />
                  </div>
                </FormControl>
                <FormMessage className="text-xs mt-1.5" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name *</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Input
                      placeholder="Doe"
                      aria-label="Last Name"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs mt-1.5" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address *</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Input
                      placeholder="joe.doe@example.org"
                      aria-label="Email Address"
                      type="email"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs mt-1.5" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth *</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Input
                      placeholder="YYYY-MM-DD"
                      aria-label="Birth Date"
                      type="date"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs mt-1.5" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="smoker"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you smoke? *</FormLabel>
                <FormControl>
                  <ButtonGroup className="w-full">
                    <Button
                      size="lg"
                      variant={field.value ? "default" : "secondary"}
                      onClick={() => field.onChange(true)}
                      type="button"
                      className="w-1/2"
                    >
                      Yes
                    </Button>
                    <Button
                      size="lg"
                      variant={!field.value ? "default" : "secondary"}
                      onClick={() => field.onChange(false)}
                      type="button"
                      className="w-1/2"
                    >
                      No
                    </Button>
                  </ButtonGroup>
                  {/* <div className="relative group">
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      defaultValue={field.value ? "true" : "false"}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="true" id="r1" />
                        <Label htmlFor="r1">Yes</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="false" id="r2" />
                        <Label htmlFor="r2">No</Label>
                      </div>
                    </RadioGroup>
                  </div> */}
                </FormControl>
                <FormMessage className="text-xs mt-1.5" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hobbies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please tell us your hobbies *</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Textarea
                      placeholder="Reading, hiking, swimming, traveling, etc."
                      aria-label="Hobbies"
                      className="h-36"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs mt-1.5" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="healthConditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Are you currently having any health conditions? *
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Textarea
                      placeholder="No, I am healthy ;)"
                      aria-label="Health Conditions"
                      className="h-36"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs mt-1.5" />
              </FormItem>
            )}
          />

          <div className="form-actions">
            <div className="wrapper">
              <Button
                size="lg"
                variant="default"
                type="submit"
                className="w-full"
                disabled={mutation.isPending || !form.formState.isValid}
              >
                {mutation.isPending ? (
                  <span>Submitting Application...</span>
                ) : (
                  <span>Submit Application</span>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
