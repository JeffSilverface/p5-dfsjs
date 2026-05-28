import {
  Controller,
  Get,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { SessionUser } from '../auth/auth.types';
import { CreateArticleDto } from './articles.schema';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  getArticles() {
    return this.articlesService.getArticles();
  }

  @Get(':id')
  getArticle(@Param('id') id: string) {
    return this.articlesService.getArticle(id);
  }

  @Post()
  createArticle(
    @Body() dto: CreateArticleDto,
    @CurrentUser() user: SessionUser,
  ) {
    return this.articlesService.createArticle(dto, user.id);
  }
}
