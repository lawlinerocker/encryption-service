import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { envSchema } from './config/env';
import { CryptoService } from './crypto/crypto.service';
import { EncryptionHandler } from './handlers/encryption.handler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        const parsed = envSchema.safeParse(config);
        if (!parsed.success) {
          console.error(
            '❌ Invalid environment variables',
            parsed.error.format(),
          );
          throw new Error('Invalid configuration');
        }
        return parsed.data;
      },
    }),
  ],
  controllers: [AppController],
  providers: [CryptoService, EncryptionHandler],
})
export class AppModule {}
