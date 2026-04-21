import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server berjalan di http://localhost:${port}`);
}
void bootstrap();
