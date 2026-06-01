import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { PrismaService } from '../../prisma/prisma.service';
import { mockPrisma } from '../../__fixtures__/prisma.fixture';
import {
  mockTopic,
  mockSubscription,
} from '../../__fixtures__/topic.fixture';

describe('TopicsService', () => {
  let service: TopicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TopicsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<TopicsService>(TopicsService);
    jest.clearAllMocks();
  });

  describe('getTopics', () => {
    it('returns topics with isSubscribed false when not subscribed', async () => {
      mockPrisma.topic.findMany.mockResolvedValue([mockTopic]);
      mockPrisma.subscription.findMany.mockResolvedValue([]);

      const result = await service.getTopics('uuid-1');

      expect(result).toEqual([{ ...mockTopic, isSubscribed: false }]);
    });

    it('returns topics with isSubscribed true when subscribed', async () => {
      mockPrisma.topic.findMany.mockResolvedValue([mockTopic]);
      mockPrisma.subscription.findMany.mockResolvedValue([
        { topicId: mockTopic.id },
      ]);

      const result = await service.getTopics('uuid-1');

      expect(result).toEqual([{ ...mockTopic, isSubscribed: true }]);
    });
  });

  describe('subscribe', () => {
    it('creates subscription when not already subscribed', async () => {
      mockPrisma.topic.findUnique.mockResolvedValue(mockTopic);
      mockPrisma.subscription.findUnique.mockResolvedValue(null);
      mockPrisma.subscription.create.mockResolvedValue(mockSubscription);

      const result = await service.subscribe(mockTopic.id, 'uuid-1');

      expect(result).toEqual(mockSubscription);
      expect(mockPrisma.subscription.create).toHaveBeenCalledWith({
        data: { userId: 'uuid-1', topicId: mockTopic.id },
      });
    });

    it('throws ConflictException when already subscribed', async () => {
      mockPrisma.topic.findUnique.mockResolvedValue(mockTopic);
      mockPrisma.subscription.findUnique.mockResolvedValue(mockSubscription);

      await expect(service.subscribe(mockTopic.id, 'uuid-1')).rejects.toThrow(
        ConflictException,
      );
      expect(mockPrisma.subscription.create).not.toHaveBeenCalled();
    });
  });

  describe('unsubscribe', () => {
    it('deletes subscription when subscribed', async () => {
      mockPrisma.subscription.findUnique.mockResolvedValue(mockSubscription);
      mockPrisma.subscription.delete.mockResolvedValue(mockSubscription);

      await service.unsubscribe(mockTopic.id, 'uuid-1');

      expect(mockPrisma.subscription.delete).toHaveBeenCalledWith({
        where: { userId_topicId: { userId: 'uuid-1', topicId: mockTopic.id } },
      });
    });

    it('throws NotFoundException when not subscribed', async () => {
      mockPrisma.subscription.findUnique.mockResolvedValue(null);

      await expect(
        service.unsubscribe(mockTopic.id, 'uuid-1'),
      ).rejects.toThrow(NotFoundException);
      expect(mockPrisma.subscription.delete).not.toHaveBeenCalled();
    });
  });
});
