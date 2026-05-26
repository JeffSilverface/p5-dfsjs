import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.TEST_USER_EMAIL ?? 'test@test.com';
  const password = process.env.TEST_USER_PASSWORD ?? 'Password1!';
  const username = process.env.TEST_USER_USERNAME ?? 'testuser';

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return;

  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { email, username, password: hashed } });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
