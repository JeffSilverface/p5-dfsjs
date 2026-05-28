export type Article = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  topicId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ArticleWithRelations = Article & {
  author: { id: string; username: string };
  topic: { id: string; name: string };
  _count: { comments: number };
};
