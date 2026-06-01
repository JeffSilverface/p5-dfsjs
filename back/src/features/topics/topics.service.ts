import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TopicsService {
  constructor(private readonly prisma: PrismaService) {}

  async getTopics(userId: string) {
    const topics = await this.prisma.topic.findMany();
    const subscriptions = await this.prisma.subscription.findMany({
      where: { userId },
      select: { topicId: true },
    });

    const subscribedIds = new Set(subscriptions.map((s) => s.topicId));

    return topics.map((topic) => ({
      ...topic,
      isSubscribed: subscribedIds.has(topic.id),
    }));
  }

  async subscribe(topicId: string, userId: string) {
    const topic = await this.prisma.topic.findUnique({ where: { id: topicId } });
    if (!topic) throw new NotFoundException('Topic not found');

    const exists = await this.prisma.subscription.findUnique({
      where: { userId_topicId: { userId, topicId } },
    });
    if (exists) throw new ConflictException('Already subscribed');

    return this.prisma.subscription.create({
      data: { userId, topicId },
    });
  }

  async unsubscribe(topicId: string, userId: string): Promise<void> {
    const exists = await this.prisma.subscription.findUnique({
      where: { userId_topicId: { userId, topicId } },
    });
    if (!exists) throw new NotFoundException('Subscription not found');

    await this.prisma.subscription.delete({
      where: { userId_topicId: { userId, topicId } },
    });
  }
}
