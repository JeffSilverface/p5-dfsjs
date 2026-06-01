import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { PrismaService } from '../../prisma/prisma.service';
import { mockPrisma } from '../../__fixtures__/prisma.fixture';
import {
  mockComment,
  mockCreateCommentDto,
} from '../../__fixtures__/comment.fixture';

describe('CommentsService', () => {
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    jest.clearAllMocks();
  });

  describe('getComments', () => {
    it('returns comments for an article', async () => {
      mockPrisma.comment.findMany.mockResolvedValue([mockComment]);

      const result = await service.getComments('article-uuid-1');

      expect(result).toEqual([mockComment]);
      expect(mockPrisma.comment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { articleId: 'article-uuid-1' } }),
      );
    });

    it('returns empty array when no comments', async () => {
      mockPrisma.comment.findMany.mockResolvedValue([]);

      const result = await service.getComments('article-uuid-1');

      expect(result).toEqual([]);
    });
  });

  describe('createComment', () => {
    it('creates and returns comment with author', async () => {
      mockPrisma.comment.create.mockResolvedValue(mockComment);

      const result = await service.createComment(
        'article-uuid-1',
        'uuid-1',
        mockCreateCommentDto,
      );

      expect(result).toEqual(mockComment);
      expect(mockPrisma.comment.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: {
            content: mockCreateCommentDto.content,
            articleId: 'article-uuid-1',
            authorId: 'uuid-1',
          },
        }),
      );
    });
  });
});
