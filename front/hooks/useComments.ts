import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { CommentWithAuthor } from "@/types/comment.types";

const commentsKey = (postId: string) => ["post", postId, "comments"] as const;

export function useComments(postId: string) {
  return useQuery({
    queryKey: commentsKey(postId),
    queryFn: () => api.get<CommentWithAuthor[]>(`/posts/${postId}/comments`),
    enabled: !!postId,
  });
}

export function useCreateComment(postId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) =>
      api.post<CommentWithAuthor>(`/posts/${postId}/comments`, { content }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: commentsKey(postId) }),
  });
}
