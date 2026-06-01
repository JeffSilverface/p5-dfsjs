import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import {
  mockArticle,
  mockCreateArticleDto,
} from '../../__fixtures__/article.fixture';
import { mockSessionUser } from '../../__fixtures__/user.fixture';

const mockArticlesService = {
  getArticles: jest.fn(),
  getArticle: jest.fn(),
  createArticle: jest.fn(),
};

describe('ArticlesController', () => {
  let controller: ArticlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [{ provide: ArticlesService, useValue: mockArticlesService }],
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
    jest.clearAllMocks();
  });

  describe('getArticles', () => {
    it('returns list from service', async () => {
      mockArticlesService.getArticles.mockResolvedValue([mockArticle]);

      const result = await controller.getArticles();

      expect(result).toEqual([mockArticle]);
      expect(mockArticlesService.getArticles).toHaveBeenCalledTimes(1);
    });
  });

  describe('getArticle', () => {
    it('returns article by id from service', async () => {
      mockArticlesService.getArticle.mockResolvedValue(mockArticle);

      const result = await controller.getArticle(mockArticle.id);

      expect(result).toEqual(mockArticle);
      expect(mockArticlesService.getArticle).toHaveBeenCalledWith(
        mockArticle.id,
      );
    });
  });

  describe('createArticle', () => {
    it('calls service with dto and user id', async () => {
      mockArticlesService.createArticle.mockResolvedValue(mockArticle);

      const result = await controller.createArticle(
        mockCreateArticleDto,
        mockSessionUser,
      );

      expect(result).toEqual(mockArticle);
      expect(mockArticlesService.createArticle).toHaveBeenCalledWith(
        mockCreateArticleDto,
        mockSessionUser.id,
      );
    });
  });
});
