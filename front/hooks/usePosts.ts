import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { PostWithRelations } from '@/types/post.types';
import type { CreatePostDto } from '@/lib/schemas/post.schema';

const POSTS_KEY = ['posts'] as const;

export function usePosts() {
  return useQuery({
    queryKey: POSTS_KEY,
    queryFn: () => api.get<PostWithRelations[]>('/posts'),
  });
}

export function usePost(id: string) {
  return useQuery({
    queryKey: [...POSTS_KEY, id],
    queryFn: () => api.get<PostWithRelations>(`/posts/${id}`),
    enabled: !!id,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreatePostDto) => api.post<PostWithRelations>('/posts', dto),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: POSTS_KEY }),
  });
}
