export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  topicId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PostWithRelations = Post & {
  author: { id: string; username: string };
  topic: { id: string; name: string };
  _count: { comments: number };
};
