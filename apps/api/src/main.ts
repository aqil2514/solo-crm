import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:3000'],
      credentials: true,
    },
  });
  const port = process.env.PORT;
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server berjalan di http://localhost:${port}`);
}
void bootstrap();
