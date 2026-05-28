import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { TopicWithSubscription } from '@/types/topic.types';

const TOPICS_KEY = ['topics'] as const;

export function useTopics() {
  return useQuery({
    queryKey: TOPICS_KEY,
    queryFn: () => api.get<TopicWithSubscription[]>('/topics'),
  });
}

export function useSubscribe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (topicId: string) => api.post(`/topics/${topicId}/subscribe`, {}),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TOPICS_KEY }),
  });
}

export function useUnsubscribe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (topicId: string) => api.delete(`/topics/${topicId}/subscribe`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TOPICS_KEY }),
  });
}
