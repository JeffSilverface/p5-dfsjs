import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './features/posts/posts.module';
import { TopicsModule } from './features/topics/topics.module';
import { CommentsModule } from './features/comments/comments.module';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { AuthModule } from './features/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    PostsModule,
    TopicsModule,
    CommentsModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthenticatedGuard }],
})
export class AppModule {}
