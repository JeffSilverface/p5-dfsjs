import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto, UpdateProfileDto } from './auth.schema';
import type { SessionUser } from './auth.types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(email: string, password: string): Promise<SessionUser> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return { id: user.id, email: user.email, username: user.username };
  }

  async register(dto: RegisterDto): Promise<SessionUser> {
    const exists = await this.prisma.user.findFirst({
      where: { OR: [{ email: dto.email }, { username: dto.username }] },
    });
    if (exists) throw new ConflictException('Email or username already taken');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { email: dto.email, username: dto.username, password: hashed },
    });

    return { id: user.id, email: user.email, username: user.username };
  }

  async updateProfile(
    userId: string,
    dto: UpdateProfileDto,
  ): Promise<SessionUser> {
    if (dto.username) {
      const exists = await this.prisma.user.findFirst({
        where: { AND: [{ id: { not: userId } }, { username: dto.username }] },
      });
      if (exists) throw new ConflictException('Username already taken');
    }

    const data: Record<string, unknown> = {};
    if (dto.username) data.username = dto.username;
    if (dto.password) data.password = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.update({ where: { id: userId }, data });
    return { id: user.id, email: user.email, username: user.username };
  }
}
