import { LocalStrategy } from './local.strategy';
import { mockSessionUser } from '../../../__fixtures__/user.fixture';

describe('LocalStrategy', () => {
  it('validates user credentials through AuthService', async () => {
    const authService = {
      validateUser: jest.fn().mockResolvedValue(mockSessionUser),
    };
    const strategy = new LocalStrategy(authService as never);

    const result = await strategy.validate('test@test.com', 'Password1!');

    expect(result).toEqual(mockSessionUser);
    expect(authService.validateUser).toHaveBeenCalledWith(
      'test@test.com',
      'Password1!',
    );
  });
});
