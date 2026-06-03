import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { mockCreatePostDto, mockPost } from '../../__fixtures__/post.fixture';
import { mockSessionUser } from '../../__fixtures__/user.fixture';

const mockPostsService = {
  getPosts: jest.fn(),
  getPost: jest.fn(),
  createPost: jest.fn(),
};

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [{ provide: PostsService, useValue: mockPostsService }],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    jest.clearAllMocks();
  });

  describe('getPosts', () => {
    it('returns posts', async () => {
      mockPostsService.getPosts.mockResolvedValue([mockPost]);

      const result = await controller.getPosts();

      expect(result).toEqual([mockPost]);
      expect(mockPostsService.getPosts).toHaveBeenCalled();
    });
  });

  describe('getPost', () => {
    it('returns one post by id', async () => {
      mockPostsService.getPost.mockResolvedValue(mockPost);

      const result = await controller.getPost(mockPost.id);

      expect(result).toEqual(mockPost);
      expect(mockPostsService.getPost).toHaveBeenCalledWith(mockPost.id);
    });
  });

  describe('createPost', () => {
    it('calls service with dto and current user id', async () => {
      mockPostsService.createPost.mockResolvedValue(mockPost);

      const result = await controller.createPost(
        mockCreatePostDto,
        mockSessionUser,
      );

      expect(result).toEqual(mockPost);
      expect(mockPostsService.createPost).toHaveBeenCalledWith(
        mockCreatePostDto,
        mockSessionUser.id,
      );
    });
  });
});
