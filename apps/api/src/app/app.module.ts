import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, AuthModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
