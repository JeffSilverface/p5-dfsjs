import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { mockUser } from '../../__fixtures__/user.fixture';
import { mockPrisma } from '../../__fixtures__/prisma.fixture';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('returns SessionUser when credentials are valid', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      jest.mocked(bcrypt.compare).mockResolvedValue(true as never);

      const result = await service.validateUser('test@test.com', 'password');

      expect(result).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        username: mockUser.username,
      });
    });

    it('throws UnauthorizedException when user does not exist', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(
        service.validateUser('unknown@test.com', 'password'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('throws UnauthorizedException when password is invalid', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      jest.mocked(bcrypt.compare).mockResolvedValue(false as never);

      await expect(
        service.validateUser('test@test.com', 'wrong'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    const dto = {
      email: 'new@test.com',
      username: 'newuser',
      password: 'Password1!',
    };

    it('creates and returns SessionUser', async () => {
      mockPrisma.user.findFirst.mockResolvedValue(null);
      jest.mocked(bcrypt.hash).mockResolvedValue('hashed' as never);
      mockPrisma.user.create.mockResolvedValue({ ...mockUser, ...dto });

      const result = await service.register(dto);

      expect(result).toEqual({
        id: mockUser.id,
        email: dto.email,
        username: dto.username,
      });
    });

    it('throws ConflictException when email or username is already taken', async () => {
      mockPrisma.user.findFirst.mockResolvedValue(mockUser);

      await expect(service.register(dto)).rejects.toThrow(ConflictException);
    });
  });
});
