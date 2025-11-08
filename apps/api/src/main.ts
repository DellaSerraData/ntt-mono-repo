// apps/api/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

// Request-Id simples
import { randomUUID } from 'crypto';
import type { Request, Response, NextFunction } from 'express';

function requestIdMiddleware(req: Request, _res: Response, next: NextFunction) {
  (req as any).requestId = (req.headers['x-request-id'] as string) || randomUUID();
  next();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['error','warn','log'] // ajuste se quiser menos ruído
  });

  app.setGlobalPrefix('api');
  app.use(helmet());
  app.use(requestIdMiddleware);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,       // remove campos desconhecidos
    transform: true,       // transforma tipos (DTOs)
    forbidNonWhitelisted: false
  }));

  app.enableCors({
    origin: process.env.WEB_ORIGIN, // ex.: https://seu-web.vercel.app
    credentials: true,
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization','X-Requested-With','X-Request-Id']
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
