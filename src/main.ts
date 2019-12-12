import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerOptions = new DocumentBuilder()
    .setTitle('mCRM by Webkunx')
    .setDescription('My opensource crm created with NestJS, MySQL')
    .setVersion('0.4.1')
    .addTag('crm')
    .build();

  const swagger = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('', app, swagger);

  await app.listen(3000);
}
bootstrap();
