import type { RegisterDto } from '../features/auth/auth.schema';

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

export const mockRegisterDto: RegisterDto = {
  email: 'new@test.com',
  username: 'newuser',
  password: 'Password1!',
};
