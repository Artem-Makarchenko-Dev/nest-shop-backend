import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  console.log('🚀 Bootstrap started');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({ origin: true });
  console.log('✅ CORS enabled');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const port = configService.get<number>('PORT') ?? 4000;
  await app.listen(port);
  console.log(`✅ Server running on port ${port}`);
}

bootstrap();