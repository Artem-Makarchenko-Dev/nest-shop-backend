import * as dotenv from 'dotenv';
import { existsSync } from 'fs';
import { join } from 'path';

const defaultEnv = 'development';
const nodeEnv = process.env.NODE_ENV || defaultEnv;

const envFiles = [
  `.env.${nodeEnv}.local`,
  `.env.${nodeEnv}`,
  `.env`,
];

for (const file of envFiles) {
  const path = join(process.cwd(), file);
  if (existsSync(path)) {
    dotenv.config({ path });
    break;
  }
}