import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  // Note: `client` is public to allow access from other services.
  public client: ReturnType<typeof this.createAcceleratedClient>;

  constructor() {
    this.client = this.createAcceleratedClient();
  }

  private createAcceleratedClient() {
    return new PrismaClient().$extends(withAccelerate());
  }

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}

