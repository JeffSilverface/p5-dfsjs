import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateArticleDto } from './articles.schema';

const ARTICLE_INCLUDE = {
  author: { select: { id: true, username: true } },
  topic: { select: { id: true, name: true } },
} as const;

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async getArticles() {
    return this.prisma.article.findMany({ include: ARTICLE_INCLUDE });
  }

  async getArticle(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: ARTICLE_INCLUDE,
    });
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  async createArticle(dto: CreateArticleDto, authorId: string) {
    return this.prisma.article.create({
      data: { ...dto, authorId },
      include: ARTICLE_INCLUDE,
    });
  }
}
