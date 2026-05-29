import type { CreateCommentDto } from '../features/comments/comments.schema';

export const mockComment = {
  id: 'comment-uuid-1',
  content: 'This is a test comment',
  authorId: 'uuid-1',
  articleId: 'article-uuid-1',
  createdAt: new Date(),
  author: { id: 'uuid-1', username: 'testuser' },
};

export const mockCreateCommentDto: CreateCommentDto = {
  content: 'This is a test comment',
};
