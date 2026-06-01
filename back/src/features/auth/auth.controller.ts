import {
  Controller,
  Post,
  Patch,
  Get,
  Body,
  UseGuards,
  Req,
  Res,
  HttpCode,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import {
  RegisterSchema,
  type RegisterDto,
  UpdateProfileSchema,
  type UpdateProfileDto,
} from './auth.schema';
import type { Request, Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { SessionUser } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  async register(@Body() body: unknown) {
    const dto: RegisterDto = RegisterSchema.parse(body);
    return this.authService.register(dto);
  }

  @Get('me')
  me(@Req() req: Request) {
    return req.user;
  }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  login(@Req() req: Request) {
    return req.user;
  }

  @Patch('profile')
  updateProfile(@Body() body: unknown, @CurrentUser() user: SessionUser) {
    const dto: UpdateProfileDto = UpdateProfileSchema.parse(body);
    return this.authService.updateProfile(user.id, dto);
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    req.logout((err) => {
      if (err) throw err;
    });
    res.clearCookie('connect.sid', { httpOnly: true, path: '/' });
    return { message: 'Logged out' };
  }
}
