import type { ExecutionContext } from '@nestjs/common';

const passportCanActivate = jest.fn();
const passportLogIn = jest.fn();

jest.mock('@nestjs/passport', () => ({
  AuthGuard: jest.fn(() => {
    return class {
      canActivate(context: ExecutionContext) {
        return passportCanActivate(context);
      }

      logIn(request: unknown) {
        return passportLogIn(request);
      }
    };
  }),
}));

import { LocalAuthGuard } from './local-auth.guard';

describe('LocalAuthGuard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    passportCanActivate.mockResolvedValue(true);
    passportLogIn.mockResolvedValue(undefined);
  });

  it('delegates authentication to Passport and logs in the request', async () => {
    const request = { body: { email: 'test@test.com' } };
    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as unknown as ExecutionContext;
    const guard = new LocalAuthGuard();

    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    expect(passportCanActivate).toHaveBeenCalledWith(context);
    expect(passportLogIn).toHaveBeenCalledWith(request);
  });
});
