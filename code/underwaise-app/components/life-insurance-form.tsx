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

type FormValues = z.infer<typeof formSchema>;

export function LifeInsuranceForm() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      birthDate: "",
      medicalConditions: "",
      hobbies: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await fetch("/api/life-insurance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      return response.json();
    },
    onSuccess: () => {
      setSubmitStatus("success");
      form.reset();
    },
    onError: () => {
      setSubmitStatus("error");
    },
  });

  const onSubmit = (data: FormValues) => {
    setSubmitStatus("idle");
    mutation.mutate(data);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 p-8 md:p-12">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
            Life Insurance Application
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Please fill out the form below to apply for life insurance coverage.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-900 dark:text-zinc-50">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="bg-white dark:bg-zinc-900"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-900 dark:text-zinc-50">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      {...field}
                      className="bg-white dark:bg-zinc-900"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-900 dark:text-zinc-50">
                    Date of Birth
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="bg-white dark:bg-zinc-900"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="medicalConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-900 dark:text-zinc-50">
                    Medical Conditions
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe any medical conditions or enter 'None'"
                      className="min-h-[120px] resize-none bg-white dark:bg-zinc-900"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hobbies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-900 dark:text-zinc-50">
                    Hobbies & Free Time Activities
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What do you enjoy doing in your free time?"
                      className="min-h-[120px] resize-none bg-white dark:bg-zinc-900"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {submitStatus === "success" && (
              <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-md">
                <p className="text-green-800 dark:text-green-400 font-medium">
                  Application submitted successfully! We'll be in touch soon.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-md">
                <p className="text-red-800 dark:text-red-400 font-medium">
                  Failed to submit application. Please try again.
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium py-6 text-base"
            >
              {mutation.isPending ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
