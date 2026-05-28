import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { CommentWithAuthor } from '@/types/comment.types';

const commentsKey = (articleId: string) => ['articles', articleId, 'comments'] as const;

export function useComments(articleId: string) {
  return useQuery({
    queryKey: commentsKey(articleId),
    queryFn: () => api.get<CommentWithAuthor[]>(`/articles/${articleId}/comments`),
    enabled: !!articleId,
  });
}

export function useCreateComment(articleId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) =>
      api.post<CommentWithAuthor>(`/articles/${articleId}/comments`, { content }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: commentsKey(articleId) }),
  });
}
