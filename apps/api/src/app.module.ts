import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ThrottlerModule.forRoot([{
      ttl: 60000, // 60 seconds
      limit: 60,  // 60 requests per IP per minute
    }]),
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
