import { z } from "zod";

const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title is too short" })
    .max(250, { message: "Title is too long" })
    .trim(),
  description: z
    .string()
    .min(5, { message: "Description is too short" })
    .max(400, { message: "Description is too long" })
    .trim(),
  body: z.string().min(5, { message: "Body is too short" }).trim(),
});

export default formSchema;
