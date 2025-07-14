import { z } from 'zod';
import { readKeyFile, updateEnvFile } from '../helpers/envLoader.helper';

const PRIVATE_KEY = readKeyFile('../../dist/keys/private.pem', 'Private');
const PUBLIC_KEY = readKeyFile('../../dist/keys/public.pem', 'Public');

if (process.env.NODE_ENV !== 'production') {
  updateEnvFile('PRIVATE_KEY', PRIVATE_KEY);
  updateEnvFile('PUBLIC_KEY', PUBLIC_KEY);
}

export const envSchema = z.object({
  MODE: z.enum(['local', 'online']).default('local'),
  PRIVATE_KEY: z.string().min(1),
  PUBLIC_KEY: z.string().min(1),
  PORT: z.preprocess(
    (val) => (typeof val === 'string' ? parseInt(val, 10) : val),
    z.number().int().positive().max(65535).default(3000),
  ),
  X_API_KEY: z.string().optional(),
});

const parsedEnv = envSchema.safeParse({
  MODE: process.env.MODE || 'local',
  PRIVATE_KEY: process.env.PRIVATE_KEY || PRIVATE_KEY,
  PUBLIC_KEY: process.env.PUBLIC_KEY || PUBLIC_KEY,
  PORT: process.env.PORT,
  X_API_KEY: process.env.X_API_KEY,
});

if (!parsedEnv.success) {
  console.error('❌ Env validation failed:', parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
