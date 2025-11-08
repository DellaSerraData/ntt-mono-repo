// apps/api/src/health.controller.ts
import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async liveness() {
    return { status: 'ok', time: new Date().toISOString() };
  }

  @Get('ready')
  async readiness() {
    // Prova de vida do banco (barata e suficiente)
    await this.prisma.$queryRaw`SELECT 1`;
    return { status: 'ready', db: 'ok', time: new Date().toISOString() };
  }
}
