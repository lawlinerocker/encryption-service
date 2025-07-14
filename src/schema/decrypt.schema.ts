import { z } from 'zod';

export const decryptSchema = z.object({
  data1: z.string(),
  data2: z.string(),
});

export type DecryptDto = z.infer<typeof decryptSchema>;
