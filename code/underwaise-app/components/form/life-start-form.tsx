"use client";

import { useEffect, useState } from "react";
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
import axios from "axios";
import { useRouter } from "next/navigation";
import "./life-star-form.style.scss";
import { ButtonGroup } from "../ui/button-group";
import Link from "next/link";
import { toast } from "sonner";

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

const calculateFormCompletion = (values: FormValues): number => {
  const fields = [
    values.firstName,
    values.lastName,
    values.email,
    values.birthDate,
    values.smoker !== undefined, // For boolean field, check if it's defined
    values.hobbies,
    values.healthConditions,
  ];

  const filledFields = fields.filter((field) => {
    if (typeof field === "boolean") return true; // Boolean fields are always considered filled
    if (typeof field === "string") return field.trim().length > 0;
    return false;
  });

  const percentage = Math.round((filledFields.length / fields.length) * 100);
  return percentage;
};

export function LifeStarForm() {
  const router = useRouter();

  const [completionPercentage, setCompletionPercentage] = useState<number>(14);

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
    mode: "onTouched",
  });

  const watchedValues = form.watch();

  useEffect(() => {
    const percentage = calculateFormCompletion(watchedValues);
    setCompletionPercentage(percentage);
  }, [watchedValues]);

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitApplication(values);
  }

  return (
    <div className="form-container">
      <div className="form-progress">
        <div
          className="progress-indicator"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      <h2>Apply now for your life Spar Lebensversicherung</h2>
      <p className="subtitle">Please fill out the form with your information</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">First Name *</FormLabel>
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
                <FormLabel className="form-label">Last Name *</FormLabel>
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
                <FormLabel className="form-label">Email Address *</FormLabel>
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
                <FormLabel className="form-label">Date of Birth *</FormLabel>
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
                <FormLabel className="form-label">Do you smoke? *</FormLabel>
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
                <FormLabel className="form-label">
                  Please tell us your hobbies *
                </FormLabel>
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
                <FormLabel className="form-label">
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
                variant="secondary"
                type="submit"
                className="secondary-action"
                asChild
              >
                <Link href="/">Cancel</Link>
              </Button>
              <Button
                size="lg"
                variant="default"
                type="submit"
                className="primary-action"
                disabled={isPending || !form.formState.isValid}
              >
                {isPending ? (
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
