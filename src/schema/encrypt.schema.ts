import { z } from 'zod';

export const encryptSchema = z.object({
  payload: z.string().min(1).max(2000),
});

export type EncryptDto = z.infer<typeof encryptSchema>;
