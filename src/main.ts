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
      console.log('🌍 Incoming origin:', origin);
      console.log('✅ Allowed origins list:', origins);
      if (!origin) return callback(null, true);
      const allowed = origins.some(o => origin.trim().startsWith(o));
      console.log('✅ Allowed?', allowed);
      return allowed ? callback(null, true) : callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    optionsSuccessStatus: 200,
    preflightContinue: false,
  });
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    next();
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
