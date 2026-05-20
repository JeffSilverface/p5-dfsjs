export type Comment = {
  id: string
  content: string
  authorId: string
  articleId: string
  createdAt: Date
}

export type CommentWithAuthor = Comment & {
  author: { id: string; username: string }
}
