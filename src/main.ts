import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('FRONT_URL:', process.env.FRONT_URL);

  const allowedOrigins = (process.env.FRONT_URL || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  console.log('allowedOrigins:', allowedOrigins);

  app.getHttpAdapter().get('/health', (_, res) => {
    res.send('OK');
  });

  app.enableCors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked for origin: ${origin}`), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = process.env.PORT || 8080; // <---- Railway automatically sets this
  await app.listen(port, '0.0.0.0');
  console.log(`Server running on port ${port}`);
}
bootstrap();
