import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TopicsService {
  constructor(private readonly prisma: PrismaService) {}

  getTopics() {
    return this.prisma.topic.findMany();
  }
}
