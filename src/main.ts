import '../bootstrap';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { AppModule } from "@/src/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const origins = configService.get<string>('CORS_ORIGINS')?.split(',') ?? [];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (origins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
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
