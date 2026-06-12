import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ZodExceptionFilter } from './common/filters/zod-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import session from 'express-session';
import passport from 'passport';
import connectPgSimple from 'connect-pg-simple';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const PgStore = connectPgSimple(session);

  app.use(
    session({
      store: new PgStore({
        conString: config.getOrThrow('DATABASE_URL'),
        createTableIfMissing: true,
      }),
      secret: config.getOrThrow('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    origin: config.getOrThrow<string>('FRONTEND_URL'),
    credentials: true,
  });

  app.useGlobalFilters(new ZodExceptionFilter());

  if (process.env.NODE_ENV !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('p5-dfsjs API')
      .setDescription('Forum API — auth, posts, comments, topics')
      .setVersion('1.0')
      .addCookieAuth('connect.sid')
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
  }

  const port = config.get<number>('PORT') ?? 3001;
  await app.listen(port);
}
bootstrap();
