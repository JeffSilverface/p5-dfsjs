import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.subscription.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.article.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.user.deleteMany();

  const topics = await Promise.all([
    prisma.topic.create({
      data: { name: 'JavaScript', description: 'Tout sur JS et son écosystème' },
    }),
    prisma.topic.create({
      data: { name: 'TypeScript', description: 'Typage statique pour JavaScript' },
    }),
    prisma.topic.create({
      data: { name: 'NestJS', description: 'Framework Node.js progressif' },
    }),
    prisma.topic.create({
      data: { name: 'React', description: 'Bibliothèque UI de Meta' },
    }),
  ]);

  const hash = (pwd: string) => bcrypt.hash(pwd, 10);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'alice@example.com',
        username: 'alice',
        password: await hash('Password1!'),
      },
    }),
    prisma.user.create({
      data: {
        email: 'bob@example.com',
        username: 'bob',
        password: await hash('Password1!'),
      },
    }),
    prisma.user.create({
      data: {
        email: 'charlie@example.com',
        username: 'charlie',
        password: await hash('Password1!'),
      },
    }),
  ]);

  const [js, ts, nest, react] = topics;
  const [alice, bob, charlie] = users;

  await Promise.all([
    prisma.article.create({
      data: {
        title: 'Les nouveautés ES2024',
        content:
          'ES2024 apporte de nombreuses améliorations comme Object.groupBy, Promise.withResolvers et le flag /v pour les RegExp.',
        authorId: alice.id,
        topicId: js.id,
      },
    }),
    prisma.article.create({
      data: {
        title: 'Comprendre les closures en JavaScript',
        content:
          'Une closure est une fonction qui garde accès aux variables de son scope parent même après son exécution.',
        authorId: bob.id,
        topicId: js.id,
      },
    }),
    prisma.article.create({
      data: {
        title: 'TypeScript 5.x : les génériques avancés',
        content:
          'Les génériques conditionnels et les types template literal transforment la façon dont on type nos APIs.',
        authorId: alice.id,
        topicId: ts.id,
      },
    }),
    prisma.article.create({
      data: {
        title: 'Utility Types TypeScript indispensables',
        content:
          'Partial, Required, Pick, Omit, Record — maîtriser ces types utilitaires évite de réécrire des types redondants.',
        authorId: charlie.id,
        topicId: ts.id,
      },
    }),
    prisma.article.create({
      data: {
        title: 'NestJS : injection de dépendances expliquée',
        content:
          "Le système d'IoC de NestJS repose sur les décorateurs TypeScript et les providers. Voici comment ça fonctionne.",
        authorId: bob.id,
        topicId: nest.id,
      },
    }),
    prisma.article.create({
      data: {
        title: 'Guards et interceptors NestJS',
        content:
          "Les guards gèrent l'autorisation, les interceptors transforment requêtes/réponses. Différences et cas d'usage.",
        authorId: charlie.id,
        topicId: nest.id,
      },
    }),
    prisma.article.create({
      data: {
        title: 'React Server Components en pratique',
        content:
          'Les RSC permettent de rendre des composants côté serveur sans JS client. Avantages, limites et patterns.',
        authorId: alice.id,
        topicId: react.id,
      },
    }),
    prisma.article.create({
      data: {
        title: 'Optimiser les re-renders React',
        content:
          'useMemo, useCallback, memo — quand les utiliser vraiment et quand ils créent plus de problèmes qu\'ils n\'en résolvent.',
        authorId: bob.id,
        topicId: react.id,
      },
    }),
  ]);

  await Promise.all([
    prisma.subscription.create({ data: { userId: alice.id, topicId: js.id } }),
    prisma.subscription.create({ data: { userId: alice.id, topicId: ts.id } }),
    prisma.subscription.create({ data: { userId: alice.id, topicId: react.id } }),
    prisma.subscription.create({ data: { userId: bob.id, topicId: js.id } }),
    prisma.subscription.create({ data: { userId: bob.id, topicId: nest.id } }),
    prisma.subscription.create({ data: { userId: charlie.id, topicId: ts.id } }),
    prisma.subscription.create({ data: { userId: charlie.id, topicId: nest.id } }),
    prisma.subscription.create({ data: { userId: charlie.id, topicId: react.id } }),
  ]);

  console.log('Seed terminé : 4 topics, 3 users, 8 articles, 8 subscriptions');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
