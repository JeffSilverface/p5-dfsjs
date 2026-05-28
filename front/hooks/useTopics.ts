import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Topic } from '@/types/topic.types';

export function useTopics() {
  return useQuery({
    queryKey: ['topics'],
    queryFn: () => api.get<Topic[]>('/topics'),
  });
}
