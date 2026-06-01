import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  ExecutionContext,
  INestApplication,
  UnauthorizedException,
} from '@nestjs/common';
import request from 'supertest';
import type { Request } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {
  mockUser,
  mockSessionUser,
  mockRegisterDto,
} from '../../__fixtures__/user.fixture';
import { mockAuthService } from '../../__fixtures__/auth.fixture';
import { ZodExceptionFilter } from '../../common/filters/zod-exception.filter';

describe('AuthController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    })
      .overrideGuard(LocalAuthGuard)
      .useValue({
        canActivate: (ctx: ExecutionContext) => {
          ctx.switchToHttp().getRequest<Request>().user = mockSessionUser;
          return true;
        },
      })
      .overrideGuard(AuthenticatedGuard)
      .useValue({
        canActivate: (ctx: ExecutionContext) => {
          ctx.switchToHttp().getRequest<Request>().user = mockSessionUser;
          return true;
        },
      })
      .compile();

    app = module.createNestApplication();
    app.useGlobalFilters(new ZodExceptionFilter());
    app.use(
      (
        req: Request & { logout: (cb: (err: unknown) => void) => void },
        _res: unknown,
        next: () => void,
      ) => {
        req.user = mockSessionUser;
        req.logout = (cb: (err: null) => void) => cb(null);
        next();
      },
    );
    await app.init();
    jest.clearAllMocks();
  });

  afterEach(() => app.close());

  describe('POST /auth/register', () => {
    it('returns 201 with SessionUser on success', async () => {
      mockAuthService.register.mockResolvedValue(mockSessionUser);

      const res = await request(app.getHttpServer())
        .post('/auth/register')
        .send(mockRegisterDto);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(mockSessionUser);
    });

    it('returns 409 when email or username already taken', async () => {
      mockAuthService.register.mockRejectedValue(new ConflictException());

      const res = await request(app.getHttpServer())
        .post('/auth/register')
        .send(mockRegisterDto);

      expect(res.status).toBe(409);
    });

    it('returns 400 when body is invalid', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'not-an-email' });

      expect(res.status).toBe(400);
    });
  });

  describe('POST /auth/login', () => {
    it('returns 200 with SessionUser on success', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: mockUser.email, password: 'password' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockSessionUser);
    });

    it('returns 401 when credentials are invalid', async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [{ provide: AuthService, useValue: mockAuthService }],
      })
        .overrideGuard(LocalAuthGuard)
        .useValue({
          canActivate: () => {
            throw new UnauthorizedException();
          },
        })
        .overrideGuard(AuthenticatedGuard)
        .useValue({ canActivate: () => true })
        .compile();

      const failApp = module.createNestApplication();
      await failApp.init();

      const res = await request(failApp.getHttpServer())
        .post('/auth/login')
        .send({ email: mockUser.email, password: 'wrong' });

      expect(res.status).toBe(401);
      await failApp.close();
    });
  });

  describe('GET /auth/me', () => {
    it('returns 200 with authenticated user', async () => {
      const res = await request(app.getHttpServer()).get('/auth/me');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockSessionUser);
    });
  });

  describe('PATCH /auth/profile', () => {
    it('returns 200 with updated SessionUser', async () => {
      const updated = { ...mockSessionUser, username: 'newname' };
      mockAuthService.updateProfile.mockResolvedValue(updated);

      const res = await request(app.getHttpServer())
        .patch('/auth/profile')
        .send({ username: 'newname' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(updated);
      expect(mockAuthService.updateProfile).toHaveBeenCalledWith(
        mockSessionUser.id,
        { username: 'newname' },
      );
    });

    it('returns 400 when body is invalid', async () => {
      const res = await request(app.getHttpServer())
        .patch('/auth/profile')
        .send({ username: 'ab' });

      expect(res.status).toBe(400);
    });

    it('returns 400 when email is in the body', async () => {
      const res = await request(app.getHttpServer())
        .patch('/auth/profile')
        .send({ email: 'new@test.com' });

      expect(res.status).toBe(400);
    });

    it('returns 409 when username already taken', async () => {
      mockAuthService.updateProfile.mockRejectedValue(new ConflictException());

      const res = await request(app.getHttpServer())
        .patch('/auth/profile')
        .send({ username: 'takenname' });

      expect(res.status).toBe(409);
    });
  });

  describe('POST /auth/logout', () => {
    it('returns 200 with message', async () => {
      const res = await request(app.getHttpServer()).post('/auth/logout');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: 'Logged out' });
    });
  });
});
