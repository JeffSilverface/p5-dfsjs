import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { SessionUser } from '../auth/auth.types';
import { CreatePostDto } from './posts.schema';

@ApiTags('posts')
@ApiCookieAuth('connect.sid')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'List of posts' })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  getPosts() {
    return this.postsService.getPosts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Post found' })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  getPost(@Param('id') id: string) {
    return this.postsService.getPost(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['title', 'content', 'topicId'],
      properties: {
        title: { type: 'string', minLength: 3, maxLength: 100, example: 'My first post' },
        content: { type: 'string', minLength: 10, example: 'This is the content of my post.' },
        topicId: { type: 'string', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Post created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  createPost(@Body() dto: CreatePostDto, @CurrentUser() user: SessionUser) {
    return this.postsService.createPost(dto, user.id);
  }
}
