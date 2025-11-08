// apps/api/src/prisma.service.ts
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
// Se estiver usando Prisma Accelerate:
import { withAccelerate } from '@prisma/extension-accelerate';

let prismaGlobal: PrismaClient;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Singleton para ambientes serverless
    if (!prismaGlobal) {
      const base = new PrismaClient();
      prismaGlobal = (base as any).$extends?.(withAccelerate?.()) ?? base;
    }
    super();
    Object.assign(this, prismaGlobal);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    (this as any).$on('beforeExit', async () => {
      await app.close();
    });
  }
}

