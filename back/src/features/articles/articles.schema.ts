import { z } from 'zod';

export const CreateArticleSchema = z.object({
  title: z.string().min(3, 'Minimum 3 characters').max(100, 'Maximum 100 characters'),
  content: z.string().min(10, 'Minimum 10 characters'),
  topicId: z.string().uuid('Invalid topic ID'),
});

export const UpdateArticleSchema = CreateArticleSchema.partial();

export type CreateArticleDto = z.infer<typeof CreateArticleSchema>;
export type UpdateArticleDto = z.infer<typeof UpdateArticleSchema>;
