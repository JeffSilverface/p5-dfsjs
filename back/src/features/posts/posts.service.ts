import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from './posts.schema';

const POST_INCLUDE = {
  author: { select: { id: true, username: true } },
  topic: { select: { id: true, name: true } },
  _count: { select: { comments: true } },
} as const;

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPosts() {
    return this.prisma.article.findMany({
      include: POST_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPost(id: string) {
    const post = await this.prisma.article.findUnique({
      where: { id },
      include: POST_INCLUDE,
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async createPost(dto: CreatePostDto, authorId: string) {
    return this.prisma.article.create({
      data: { ...dto, authorId },
      include: POST_INCLUDE,
    });
  }
}
