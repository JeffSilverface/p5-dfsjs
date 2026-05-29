import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import {
  mockComment,
  mockCreateCommentDto,
} from '../../__fixtures__/comment.fixture';
import { mockSessionUser } from '../../__fixtures__/user.fixture';

const mockCommentsService = {
  getComments: jest.fn(),
  createComment: jest.fn(),
};

describe('CommentsController', () => {
  let controller: CommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [{ provide: CommentsService, useValue: mockCommentsService }],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    jest.clearAllMocks();
  });

  describe('getComments', () => {
    it('returns comments for an article', async () => {
      mockCommentsService.getComments.mockResolvedValue([mockComment]);

      const result = await controller.getComments('article-uuid-1');

      expect(result).toEqual([mockComment]);
      expect(mockCommentsService.getComments).toHaveBeenCalledWith(
        'article-uuid-1',
      );
    });
  });

  describe('createComment', () => {
    it('calls service with articleId, user id and dto', async () => {
      mockCommentsService.createComment.mockResolvedValue(mockComment);

      const result = await controller.createComment(
        'article-uuid-1',
        mockCreateCommentDto,
        mockSessionUser,
      );

      expect(result).toEqual(mockComment);
      expect(mockCommentsService.createComment).toHaveBeenCalledWith(
        'article-uuid-1',
        mockSessionUser.id,
        mockCreateCommentDto,
      );
    });
  });
});
