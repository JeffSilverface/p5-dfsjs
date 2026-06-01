import { Test, TestingModule } from '@nestjs/testing';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { mockTopicWithSubscription, mockSubscription } from '../../__fixtures__/topic.fixture';
import { mockSessionUser } from '../../__fixtures__/user.fixture';

const mockTopicsService = {
  getTopics: jest.fn(),
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
};

describe('TopicsController', () => {
  let controller: TopicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicsController],
      providers: [{ provide: TopicsService, useValue: mockTopicsService }],
    }).compile();

    controller = module.get<TopicsController>(TopicsController);
    jest.clearAllMocks();
  });

  describe('getTopics', () => {
    it('returns topics for current user', async () => {
      mockTopicsService.getTopics.mockResolvedValue([mockTopicWithSubscription]);

      const result = await controller.getTopics(mockSessionUser);

      expect(result).toEqual([mockTopicWithSubscription]);
      expect(mockTopicsService.getTopics).toHaveBeenCalledWith(mockSessionUser.id);
    });
  });

  describe('subscribe', () => {
    it('calls service with topicId and user id', async () => {
      mockTopicsService.subscribe.mockResolvedValue(mockSubscription);

      const result = await controller.subscribe('topic-uuid-1', mockSessionUser);

      expect(result).toEqual(mockSubscription);
      expect(mockTopicsService.subscribe).toHaveBeenCalledWith(
        'topic-uuid-1',
        mockSessionUser.id,
      );
    });
  });

  describe('unsubscribe', () => {
    it('calls service with topicId and user id', async () => {
      mockTopicsService.unsubscribe.mockResolvedValue(undefined);

      await controller.unsubscribe('topic-uuid-1', mockSessionUser);

      expect(mockTopicsService.unsubscribe).toHaveBeenCalledWith(
        'topic-uuid-1',
        mockSessionUser.id,
      );
    });
  });
});
