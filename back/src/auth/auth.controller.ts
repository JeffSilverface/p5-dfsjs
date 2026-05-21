import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterSchema, type RegisterDto } from '@shared';
import type { Request } from 'express';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';

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
  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  login(@Req() req: Request) {
    return req.user;
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Req() req: Request) {
    req.logout((err) => {
      if (err) throw err;
    });
    return { message: 'Logged out' };
  }
}
