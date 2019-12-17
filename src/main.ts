import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import * as morgan from 'morgan';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const port = 4000;

  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));
  const swaggerOptions = new DocumentBuilder()
    .setTitle('mCRM by Webkunx')
    .setDescription('My opensource crm created with NestJS, MySQL')
    .setVersion('0.4.1')
    .addTag('crm')
    .build();

  const swagger = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('', app, swagger);

  app.enableCors();

  await app.listen(port);
  logger.log(`App is running on port ${port}`);
}
bootstrap();
