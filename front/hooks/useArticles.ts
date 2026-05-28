import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { ArticleWithRelations } from '@/types/article.types';
import type { CreateArticleDto, UpdateArticleDto } from '@/lib/schemas/article.schema';

const ARTICLES_KEY = ['articles'] as const;

export function useArticles() {
  return useQuery({
    queryKey: ARTICLES_KEY,
    queryFn: () => api.get<ArticleWithRelations[]>('/articles'),
  });
}

export function useArticle(id: string) {
  return useQuery({
    queryKey: [...ARTICLES_KEY, id],
    queryFn: () => api.get<ArticleWithRelations>(`/articles/${id}`),
    enabled: !!id,
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateArticleDto) => api.post<ArticleWithRelations>('/articles', dto),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ARTICLES_KEY }),
  });
}

export function useUpdateArticle(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateArticleDto) => api.patch<ArticleWithRelations>(`/articles/${id}`, dto),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ARTICLES_KEY }),
  });
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete<void>(`/articles/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ARTICLES_KEY }),
  });
}
