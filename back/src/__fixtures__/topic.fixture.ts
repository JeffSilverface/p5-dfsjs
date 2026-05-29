export const mockTopic = {
  id: 'topic-uuid-1',
  name: 'Test Topic',
  description: 'A test topic description',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockTopicWithSubscription = {
  ...mockTopic,
  isSubscribed: false,
};

export const mockSubscription = {
  id: 'sub-uuid-1',
  userId: 'uuid-1',
  topicId: 'topic-uuid-1',
  createdAt: new Date(),
};
