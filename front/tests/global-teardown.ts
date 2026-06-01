import { execSync } from 'child_process';
import path from 'path';

export default async function globalTeardown() {
  const root = path.resolve(__dirname, '../../');
  execSync('pnpm --filter @p5-dfsjs/back exec tsx src/scripts/delete-test-posts.ts', {
    cwd: root,
    stdio: 'inherit',
  });
  execSync('pnpm --filter @p5-dfsjs/back exec tsx src/scripts/delete-test-user.ts', {
    cwd: root,
    stdio: 'inherit',
  });
}
