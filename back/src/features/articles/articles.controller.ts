import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { SessionUser } from '../auth/auth.types';
import { CreateArticleDto, UpdateArticleDto } from './articles.schema';

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

  @Patch(':id')
  updateArticle(
    @Param('id') id: string,
    @Body() dto: UpdateArticleDto,
    @CurrentUser() user: SessionUser,
  ) {
    return this.articlesService.updateArticle(id, dto, user.id);
  }

  @Delete(':id')
  deleteArticle(@Param('id') id: string, @CurrentUser() user: SessionUser) {
    return this.articlesService.deleteArticle(id, user.id);
  }
}
