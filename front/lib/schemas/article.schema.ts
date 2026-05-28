import { z } from "zod";

export const CreateArticleSchema = z.object({
  title: z
    .string()
    .min(3, "Minimum 3 caractères")
    .max(100, "Maximum 100 caractères"),
  content: z.string().min(10, "Minimum 10 caractères"),
  topicId: z.string().uuid("Thème invalide"),
});

export type CreateArticleDto = z.infer<typeof CreateArticleSchema>;
