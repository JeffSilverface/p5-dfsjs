import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateArticleDto } from './articles.schema';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async getArticles() {
    return this.prisma.article.findMany({
      include: {
        author: { select: { username: true } },
        topic: { select: { name: true } },
      },
    });
  }

  async getArticle(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: {
        author: { select: { username: true } },
        topic: { select: { name: true } },
      },
    });
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  async createArticle(dto: CreateArticleDto, authorId: string) {
    return this.prisma.article.create({
      data: { ...dto, authorId },
      include: {
        author: { select: { username: true } },
        topic: { select: { name: true } },
      },
    });
  }
}
