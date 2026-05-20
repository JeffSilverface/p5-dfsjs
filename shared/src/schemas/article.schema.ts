import { z } from 'zod'

export const CreateArticleSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10),
  topicId: z.string().uuid(),
})

export const UpdateArticleSchema = CreateArticleSchema.partial()

export type CreateArticleDto = z.infer<typeof CreateArticleSchema>
export type UpdateArticleDto = z.infer<typeof UpdateArticleSchema>
