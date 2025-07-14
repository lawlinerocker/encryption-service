export class ValidationHelper {
  static parseOrThrow<T>(schema: import('zod').ZodSchema<T>, body: unknown): T {
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      console.error('Validation error:', parsed.error.format());
      throw new Error(
        `Validation failed: ${JSON.stringify(parsed.error.format())}`,
      );
    }
    return parsed.data;
  }
}
