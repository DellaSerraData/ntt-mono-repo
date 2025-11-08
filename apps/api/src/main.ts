// apps/api/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { buildCorsOptions } from './cors.config';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefixo e validação
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Segurança de headers
  app.use(helmet({ xPoweredBy: false, crossOriginOpenerPolicy: { policy: 'same-origin' } }));

  // Limites de payload (ajuste se necessário)
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ limit: '1mb', extended: true }));

  // CORS dinâmico (prod + previews)
  app.enableCors(buildCorsOptions());

  // Guard global de rate limit (config no AppModule)
  app.useGlobalGuards(new ThrottlerGuard());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
