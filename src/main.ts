import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('🚀 Bootstrap started');

  const app = await NestFactory.create(AppModule);

  // Health-check endpoint
  app.getHttpAdapter().get('/health', (_, res) => {
    res.send('OK');
  });

  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = process.env.PORT || 8080; // <---- Railway automatically sets this
  await app.listen(port, '0.0.0.0');
  console.log(`✅ Server running on port ${port}`);
}
bootstrap();