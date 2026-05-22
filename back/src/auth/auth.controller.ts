import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Res,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterSchema, type RegisterDto } from '@shared';
import type { Request, Response } from 'express';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: unknown) {
    const dto: RegisterDto = RegisterSchema.parse(body);
    return this.authService.register(dto);
  }

  @Get('me')
  @UseGuards(AuthenticatedGuard)
  me(@Req() req: Request) {
    return req.user;
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  login(@Req() req: Request) {
    return req.user;
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    req.logout((err) => {
      if (err) throw err;
    });
    res.clearCookie('connect.sid');
    return { message: 'Logged out' };
  }
}
