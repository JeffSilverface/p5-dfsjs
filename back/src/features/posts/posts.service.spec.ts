import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PrismaService } from '../../prisma/prisma.service';
import { mockPrisma } from '../../__fixtures__/prisma.fixture';
import { mockCreatePostDto, mockPost } from '../../__fixtures__/post.fixture';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService, { provide: PrismaService, useValue: mockPrisma }],
    }).compile();

    service = module.get<PostsService>(PostsService);
    jest.clearAllMocks();
  });

  describe('getPosts', () => {
    it('returns posts ordered by newest first', async () => {
      mockPrisma.article.findMany.mockResolvedValue([mockPost]);

      const result = await service.getPosts();

      expect(result).toEqual([mockPost]);
      expect(mockPrisma.article.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          include: expect.objectContaining({
            author: { select: { id: true, username: true } },
            topic: { select: { id: true, name: true } },
            _count: { select: { comments: true } },
          }),
          orderBy: { createdAt: 'desc' },
        }),
      );
    });
  });

  describe('getPost', () => {
    it('returns one post by id', async () => {
      mockPrisma.article.findUnique.mockResolvedValue(mockPost);

      const result = await service.getPost(mockPost.id);

      expect(result).toEqual(mockPost);
      expect(mockPrisma.article.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: mockPost.id },
        }),
      );
    });

    it('throws NotFoundException when post does not exist', async () => {
      mockPrisma.article.findUnique.mockResolvedValue(null);

      await expect(service.getPost('missing-post')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createPost', () => {
    it('creates and returns a post with relations', async () => {
      mockPrisma.article.create.mockResolvedValue(mockPost);

      const result = await service.createPost(mockCreatePostDto, 'uuid-1');

      expect(result).toEqual(mockPost);
      expect(mockPrisma.article.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { ...mockCreatePostDto, authorId: 'uuid-1' },
          include: expect.objectContaining({
            author: { select: { id: true, username: true } },
            topic: { select: { id: true, name: true } },
            _count: { select: { comments: true } },
          }),
        }),
      );
    });
  });
});
