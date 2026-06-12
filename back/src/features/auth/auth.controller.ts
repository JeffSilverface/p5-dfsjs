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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiCookieAuth,
} from '@nestjs/swagger';
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

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @ApiOperation({ summary: 'Create a new account' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email', 'username', 'password'],
      properties: {
        email: { type: 'string', format: 'email', example: 'user@example.com' },
        username: { type: 'string', minLength: 3, maxLength: 30, example: 'johndoe' },
        password: { type: 'string', minLength: 8, example: 'P@ssw0rd!' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Account created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async register(@Body() body: unknown) {
    const dto: RegisterDto = RegisterSchema.parse(body);
    return this.authService.register(dto);
  }

  @Get('me')
  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: 'Get current authenticated user' })
  @ApiResponse({ status: 200, description: 'Current user', schema: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
      email: { type: 'string', format: 'email' },
      username: { type: 'string' },
    },
  }})
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  me(@Req() req: Request) {
    return req.user;
  }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', format: 'email', example: 'user@example.com' },
        password: { type: 'string', example: 'P@ssw0rd!' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Login successful, session cookie set' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  login(@Req() req: Request) {
    return req.user;
  }

  @Patch('profile')
  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: 'Update username or password' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', minLength: 3, maxLength: 30, example: 'newname' },
        password: { type: 'string', minLength: 8, example: 'NewP@ss1!' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Profile updated' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  updateProfile(@Body() body: unknown, @CurrentUser() user: SessionUser) {
    const dto: UpdateProfileDto = UpdateProfileSchema.parse(body);
    return this.authService.updateProfile(user.id, dto);
  }

  @Post('logout')
  @HttpCode(200)
  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: 'Logout and clear session' })
  @ApiResponse({ status: 200, description: 'Logged out' })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    req.logout((err) => {
      if (err) throw err;
    });
    res.clearCookie('connect.sid', { httpOnly: true, path: '/' });
    return { message: 'Logged out' };
  }
}
