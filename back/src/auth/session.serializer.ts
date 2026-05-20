import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import type { SessionUser } from '@shared';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  serializeUser(user: SessionUser, done: (err: unknown, id?: string) => void) {
    done(null, user.id);
  }

  async deserializeUser(
    id: string,
    done: (err: unknown, user?: SessionUser | null) => void,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, username: true },
    });
    done(null, user);
  }
}
