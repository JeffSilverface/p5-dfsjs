import { execSync } from 'child_process';
import path from 'path';

export default async function globalSetup() {
  const root = path.resolve(__dirname, '../../');
  execSync('pnpm --filter @p5-dfsjs/back exec tsx src/scripts/create-test-user.ts', {
    cwd: root,
    stdio: 'inherit',
  });
}
