import * as z from "zod";

const formSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  birthDate: z.string().refine(
    (date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18 && age <= 100;
    },
    { message: "You must be between 18 and 100 years old" }
  ),
  medicalConditions: z.string().min(1, {
    message: "Please describe your medical conditions or enter 'None'",
  }),
  hobbies: z
    .string()
    .min(1, { message: "Please tell us about your hobbies or enter 'None'" }),
});

export { formSchema };
