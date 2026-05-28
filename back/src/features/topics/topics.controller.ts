import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { SessionUser } from '../auth/auth.types';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  getTopics(@CurrentUser() user: SessionUser) {
    return this.topicsService.getTopics(user.id);
  }

  @Post(':id/subscribe')
  subscribe(@Param('id') topicId: string, @CurrentUser() user: SessionUser) {
    return this.topicsService.subscribe(topicId, user.id);
  }

  @Delete(':id/subscribe')
  unsubscribe(@Param('id') topicId: string, @CurrentUser() user: SessionUser) {
    return this.topicsService.unsubscribe(topicId, user.id);
  }
}
