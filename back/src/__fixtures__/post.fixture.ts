import type { CreatePostDto } from '../features/posts/posts.schema';

export const mockPost = {
  id: 'post-uuid-1',
  title: 'Test Post',
  content: 'Content long enough for validation purposes',
  authorId: 'uuid-1',
  topicId: 'topic-uuid-1',
  createdAt: new Date(),
  updatedAt: new Date(),
  author: { id: 'uuid-1', username: 'testuser' },
  topic: { id: 'topic-uuid-1', name: 'Test Topic' },
  _count: { comments: 0 },
};

export const mockCreatePostDto: CreatePostDto = {
  title: 'Test Post',
  content: 'Content long enough for validation purposes',
  topicId: 'topic-uuid-1',
};
