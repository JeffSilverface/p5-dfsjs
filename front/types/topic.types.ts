export type Topic = {
  id: string;
  name: string;
  description: string;
};

export type TopicWithSubscription = Topic & {
  isSubscribed: boolean;
  _count: { subscribers: number };
};
