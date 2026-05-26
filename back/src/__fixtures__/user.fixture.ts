export const mockUser = {
  id: 'uuid-1',
  email: 'test@test.com',
  username: 'testuser',
  password: 'hashed_password',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockSessionUser = {
  id: mockUser.id,
  email: mockUser.email,
  username: mockUser.username,
};

import type { RegisterDto } from '@shared';

export const mockRegisterDto: RegisterDto = {
  email: 'new@test.com',
  username: 'newuser',
  password: 'Password1!',
};
