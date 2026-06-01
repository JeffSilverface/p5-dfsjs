import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { SessionUser } from '../auth/auth.types';
import { CreatePostDto } from './posts.schema';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.getPosts();
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postsService.getPost(id);
  }

  @Post()
  createPost(@Body() dto: CreatePostDto, @CurrentUser() user: SessionUser) {
    return this.postsService.createPost(dto, user.id);
  }
}
