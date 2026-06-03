import { UnauthorizedException, type ExecutionContext } from '@nestjs/common';
import { AuthenticatedGuard } from './authenticated.guard';

function createContext(user?: unknown): ExecutionContext {
  return {
    getHandler: jest.fn(),
    getClass: jest.fn(),
    switchToHttp: () => ({
      getRequest: () => ({ user }),
    }),
  } as unknown as ExecutionContext;
}

describe('AuthenticatedGuard', () => {
  it('allows public routes', () => {
    const reflector = { getAllAndOverride: jest.fn().mockReturnValue(true) };
    const guard = new AuthenticatedGuard(reflector as never);

    expect(guard.canActivate(createContext())).toBe(true);
  });

  it('allows authenticated requests', () => {
    const reflector = { getAllAndOverride: jest.fn().mockReturnValue(false) };
    const guard = new AuthenticatedGuard(reflector as never);

    expect(guard.canActivate(createContext({ id: 'uuid-1' }))).toBe(true);
  });

  it('throws UnauthorizedException when request has no user', () => {
    const reflector = { getAllAndOverride: jest.fn().mockReturnValue(false) };
    const guard = new AuthenticatedGuard(reflector as never);

    expect(() => guard.canActivate(createContext())).toThrow(
      UnauthorizedException,
    );
  });
});
