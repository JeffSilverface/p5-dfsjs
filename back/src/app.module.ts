import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './features/articles/articles.module';
import { TopicsModule } from './features/topics/topics.module';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { AuthModule } from './features/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ArticlesModule,
    TopicsModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthenticatedGuard }],
})
export class AppModule {}
