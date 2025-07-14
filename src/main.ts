import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { envSchema } from './config/env';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Crypto API')
    .setDescription('Encrypt and Decrypt Data using AES and RSA')
    .setVersion('1.0')
    .addTag('Crypto')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = envSchema.parse(process.env).PORT;
  await app.listen(port);

  console.log(`🚀 Server is running on http://localhost:${port}`);
  console.log(`📘 Swagger docs available at http://localhost:${port}/api-docs`);
}

void bootstrap();
