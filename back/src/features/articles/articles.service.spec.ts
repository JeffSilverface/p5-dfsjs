import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { PrismaService } from '../../prisma/prisma.service';
import { mockPrisma } from '../../__fixtures__/prisma.fixture';
import {
  mockArticle,
  mockCreateArticleDto,
} from '../../__fixtures__/article.fixture';

describe('ArticlesService', () => {
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
    jest.clearAllMocks();
  });

  describe('getArticles', () => {
    it('returns list of articles', async () => {
      mockPrisma.article.findMany.mockResolvedValue([mockArticle]);

      const result = await service.getArticles();

      expect(result).toEqual([mockArticle]);
      expect(mockPrisma.article.findMany).toHaveBeenCalledTimes(1);
    });

    it('returns empty array when no articles', async () => {
      mockPrisma.article.findMany.mockResolvedValue([]);

      const result = await service.getArticles();

      expect(result).toEqual([]);
    });
  });

  describe('getArticle', () => {
    it('returns article when found', async () => {
      mockPrisma.article.findUnique.mockResolvedValue(mockArticle);

      const result = await service.getArticle(mockArticle.id);

      expect(result).toEqual(mockArticle);
      expect(mockPrisma.article.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: mockArticle.id } }),
      );
    });

    it('throws NotFoundException when article does not exist', async () => {
      mockPrisma.article.findUnique.mockResolvedValue(null);

      await expect(service.getArticle('unknown-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createArticle', () => {
    it('creates and returns article with relations', async () => {
      mockPrisma.article.create.mockResolvedValue(mockArticle);

      const result = await service.createArticle(
        mockCreateArticleDto,
        'uuid-1',
      );

      expect(result).toEqual(mockArticle);
      expect(mockPrisma.article.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { ...mockCreateArticleDto, authorId: 'uuid-1' },
        }),
      );
    });
  });
});
