import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

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
}
