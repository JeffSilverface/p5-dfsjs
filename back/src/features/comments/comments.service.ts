import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommentDto } from './comments.schema';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getComments(articleId: string) {
    return this.prisma.comment.findMany({
      where: { articleId },
      include: { author: { select: { id: true, username: true } } },
      orderBy: { createdAt: 'asc' },
    });
  }

  async createComment(articleId: string, userId: string, dto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: { content: dto.content, articleId, authorId: userId },
      include: { author: { select: { id: true, username: true } } },
    });
  }
}
