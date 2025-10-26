import '../bootstrap';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { AppModule } from "@/src/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const origins =
    configService.get<string>('CORS_ORIGINS')?.split(',').map(o => o.trim()) ?? [];

  console.log('Allowed origins:', origins);

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const allowed = origins.some(o => origin.startsWith(o));
      if (allowed) {
        return callback(null, true);
      } else {
        console.warn(`❌ Blocked by CORS: ${origin}`);
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    optionsSuccessStatus: 200,
    preflightContinue: false,
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
}
bootstrap();
