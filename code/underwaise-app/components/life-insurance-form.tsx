"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Shield, Mail, User, Calendar, Heart, Activity, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-[#3b3a53]/10 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#3b3a53] via-[#4a495e] to-[#3b3a53] px-8 md:px-12 pt-12 pb-10 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#7cb50d]/10 rounded-full blur-3xl -z-0" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -z-0" />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-[#7cb50d] rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Life Insurance Application
                </h1>
                <p className="text-white/80 text-sm mt-1">
                  Step 1 of 1 • 5 minutes to complete
                </p>
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle2 className="h-4 w-4 text-[#7cb50d]" />
                <span className="text-white/90 text-sm font-medium">Secure & encrypted</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle2 className="h-4 w-4 text-[#7cb50d]" />
                <span className="text-white/90 text-sm font-medium">No hidden fees</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle2 className="h-4 w-4 text-[#7cb50d]" />
                <span className="text-white/90 text-sm font-medium">Fast approval</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8 md:p-12 bg-gradient-to-b from-zinc-50/50 to-white">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              {/* Personal Information Section */}
              <div className="bg-white rounded-2xl p-8 border border-[#3b3a53]/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#7cb50d] to-[#6da00b] rounded-xl flex items-center justify-center shadow-md">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#3b3a53]">Personal Information</h2>
                    <p className="text-[#3b3a53]/60 text-sm">Tell us about yourself</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#3b3a53] font-semibold text-sm">
                          Full Name *
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#3b3a53]/40 group-focus-within:text-[#7cb50d] transition-colors" />
                            <Input
                              placeholder="John Doe"
                              {...field}
                              className="pl-12 h-14 bg-white border-2 border-[#3b3a53]/10 rounded-xl focus:border-[#7cb50d] focus:ring-2 focus:ring-[#7cb50d]/20 transition-all text-[#3b3a53] placeholder:text-[#3b3a53]/40"
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
                        <FormLabel className="text-[#3b3a53] font-semibold text-sm">
                          Email Address *
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#3b3a53]/40 group-focus-within:text-[#7cb50d] transition-colors" />
                            <Input
                              type="email"
                              placeholder="john.doe@example.com"
                              {...field}
                              className="pl-12 h-14 bg-white border-2 border-[#3b3a53]/10 rounded-xl focus:border-[#7cb50d] focus:ring-2 focus:ring-[#7cb50d]/20 transition-all text-[#3b3a53] placeholder:text-[#3b3a53]/40"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs mt-1.5" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6">
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#3b3a53] font-semibold text-sm">
                          Date of Birth *
                        </FormLabel>
                        <FormDescription className="text-xs text-[#3b3a53]/60 mt-1">
                          You must be between 18 and 100 years old to apply
                        </FormDescription>
                        <FormControl>
                          <div className="relative group max-w-md mt-2">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#3b3a53]/40 group-focus-within:text-[#7cb50d] transition-colors" />
                            <Input
                              type="date"
                              {...field}
                              className="pl-12 h-14 bg-white border-2 border-[#3b3a53]/10 rounded-xl focus:border-[#7cb50d] focus:ring-2 focus:ring-[#7cb50d]/20 transition-all text-[#3b3a53]"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs mt-1.5" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Medical Information Section */}
              <div className="bg-white rounded-2xl p-8 border border-[#3b3a53]/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#7cb50d] to-[#6da00b] rounded-xl flex items-center justify-center shadow-md">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#3b3a53]">Medical Information</h2>
                    <p className="text-[#3b3a53]/60 text-sm">Help us understand your health</p>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="medicalConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#3b3a53] font-semibold text-sm">
                        Medical Conditions *
                      </FormLabel>
                      <FormDescription className="text-xs text-[#3b3a53]/60 mt-1">
                        Please describe any existing medical conditions or enter "None" if not applicable
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="E.g., Diabetes, high blood pressure, etc. or 'None'"
                          className="min-h-[160px] resize-none bg-white border-2 border-[#3b3a53]/10 rounded-xl focus:border-[#7cb50d] focus:ring-2 focus:ring-[#7cb50d]/20 transition-all text-[#3b3a53] placeholder:text-[#3b3a53]/40 mt-2 p-4"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs mt-1.5" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Lifestyle Information Section */}
              <div className="bg-white rounded-2xl p-8 border border-[#3b3a53]/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#7cb50d] to-[#6da00b] rounded-xl flex items-center justify-center shadow-md">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#3b3a53]">Lifestyle Information</h2>
                    <p className="text-[#3b3a53]/60 text-sm">Share your interests and activities</p>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="hobbies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#3b3a53] font-semibold text-sm">
                        Hobbies & Free Time Activities *
                      </FormLabel>
                      <FormDescription className="text-xs text-[#3b3a53]/60 mt-1">
                        Tell us about your hobbies and activities to help us assess your application
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="E.g., Reading, hiking, swimming, traveling, etc."
                          className="min-h-[160px] resize-none bg-white border-2 border-[#3b3a53]/10 rounded-xl focus:border-[#7cb50d] focus:ring-2 focus:ring-[#7cb50d]/20 transition-all text-[#3b3a53] placeholder:text-[#3b3a53]/40 mt-2 p-4"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs mt-1.5" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="bg-gradient-to-br from-[#7cb50d]/10 to-[#7cb50d]/5 border-2 border-[#7cb50d] rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#7cb50d] to-[#6da00b] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <CheckCircle2 className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#3b3a53] text-2xl mb-2">Application Submitted!</h3>
                      <p className="text-[#3b3a53]/80 leading-relaxed">
                        Thank you for applying. We'll review your application and contact you within 2-3 business days.
                        Check your email for confirmation and next steps.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-gradient-to-br from-red-50 to-red-50/50 border-2 border-red-300 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-white text-2xl font-bold">!</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-red-900 text-2xl mb-2">Submission Failed</h3>
                      <p className="text-red-800 leading-relaxed">
                        There was an error submitting your application. Please try again or contact our support team at support@pax.ch for assistance.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-8">
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-gradient-to-r from-[#7cb50d] to-[#6da00b] hover:from-[#6da00b] hover:to-[#5c8f09] text-white font-bold py-8 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                      <span>Submit Application</span>
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                <div className="mt-6 text-center space-y-2">
                  <p className="text-sm text-[#3b3a53]/70">
                    By submitting, you agree to our <a href="#" className="text-[#7cb50d] hover:underline font-medium">terms and conditions</a>
                  </p>
                  <p className="text-xs text-[#3b3a53]/60">
                    We'll contact you within 2-3 business days • Your data is secure and encrypted
                  </p>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
