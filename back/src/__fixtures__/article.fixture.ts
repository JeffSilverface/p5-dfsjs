import type { CreateArticleDto } from '../features/articles/articles.schema';

export const mockArticle = {
  id: 'article-uuid-1',
  title: 'Test Article',
  content: 'Content long enough for validation purposes',
  authorId: 'uuid-1',
  topicId: 'topic-uuid-1',
  createdAt: new Date(),
  updatedAt: new Date(),
  author: { id: 'uuid-1', username: 'testuser' },
  topic: { id: 'topic-uuid-1', name: 'Test Topic' },
  _count: { comments: 0 },
};

export const mockCreateArticleDto: CreateArticleDto = {
  title: 'Test Article',
  content: 'Content long enough for validation purposes',
  topicId: 'topic-uuid-1',
};
