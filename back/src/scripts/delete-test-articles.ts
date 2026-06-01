import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.TEST_USER_EMAIL ?? 'test@test.com';
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return;

  await prisma.article.deleteMany({ where: { authorId: user.id } });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
