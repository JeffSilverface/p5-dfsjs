import { SessionSerializer } from './session.serializer';
import { mockPrisma } from '../../__fixtures__/prisma.fixture';
import { mockSessionUser } from '../../__fixtures__/user.fixture';

describe('SessionSerializer', () => {
  let serializer: SessionSerializer;

  beforeEach(() => {
    serializer = new SessionSerializer(mockPrisma as never);
    jest.clearAllMocks();
  });

  it('serializes the user id into the session', () => {
    const done = jest.fn();

    serializer.serializeUser(mockSessionUser, done);

    expect(done).toHaveBeenCalledWith(null, mockSessionUser.id);
  });

  it('deserializes a session id into a user', async () => {
    const done = jest.fn();
    mockPrisma.user.findUnique.mockResolvedValue(mockSessionUser);

    await serializer.deserializeUser(mockSessionUser.id, done);

    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: mockSessionUser.id },
      select: { id: true, email: true, username: true },
    });
    expect(done).toHaveBeenCalledWith(null, mockSessionUser);
  });
});
