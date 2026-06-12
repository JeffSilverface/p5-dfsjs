import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { TopicsService } from './topics.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { SessionUser } from '../auth/auth.types';

@ApiTags('topics')
@ApiCookieAuth('connect.sid')
@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all topics with subscription status' })
  @ApiResponse({ status: 200, description: 'List of topics' })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  getTopics(@CurrentUser() user: SessionUser) {
    return this.topicsService.getTopics(user.id);
  }

  @Post(':id/subscribe')
  @ApiOperation({ summary: 'Subscribe to a topic' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'Topic ID' })
  @ApiResponse({ status: 201, description: 'Subscribed' })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  @ApiResponse({ status: 404, description: 'Topic not found' })
  subscribe(@Param('id') topicId: string, @CurrentUser() user: SessionUser) {
    return this.topicsService.subscribe(topicId, user.id);
  }

  @Delete(':id/subscribe')
  @ApiOperation({ summary: 'Unsubscribe from a topic' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid', description: 'Topic ID' })
  @ApiResponse({ status: 200, description: 'Unsubscribed' })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  @ApiResponse({ status: 404, description: 'Topic not found' })
  unsubscribe(@Param('id') topicId: string, @CurrentUser() user: SessionUser) {
    return this.topicsService.unsubscribe(topicId, user.id);
  }
}
