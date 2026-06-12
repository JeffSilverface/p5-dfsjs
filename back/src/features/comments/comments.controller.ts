import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './comments.schema';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { SessionUser } from '../auth/auth.types';

@ApiTags('comments')
@ApiCookieAuth('connect.sid')
@Controller('posts/:articleId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all comments for a post' })
  @ApiParam({ name: 'articleId', type: 'string', format: 'uuid', description: 'Post ID' })
  @ApiResponse({ status: 200, description: 'List of comments' })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  getComments(@Param('articleId') articleId: string) {
    return this.commentsService.getComments(articleId);
  }

  @Post()
  @ApiOperation({ summary: 'Add a comment to a post' })
  @ApiParam({ name: 'articleId', type: 'string', format: 'uuid', description: 'Post ID' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['content'],
      properties: {
        content: { type: 'string', minLength: 1, maxLength: 1000, example: 'Great post!' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Comment created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  createComment(
    @Param('articleId') articleId: string,
    @Body() dto: CreateCommentDto,
    @CurrentUser() user: SessionUser,
  ) {
    return this.commentsService.createComment(articleId, user.id, dto);
  }
}
