import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { ArticleWithRelations } from '@/types/article.types';
import type { CreateArticleDto } from '@/lib/schemas/article.schema';

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
