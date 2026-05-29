import { z } from 'zod';

export const CreateCommentSchema = z.object({
  content: z
    .string()
    .min(1, 'Content is required')
    .max(1000, 'Maximum 1000 characters'),
});

export type CreateCommentDto = z.infer<typeof CreateCommentSchema>;
