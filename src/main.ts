import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import * as morgan from 'morgan';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  const port = process.env.PORT || serverConfig.port;

  const app = await NestFactory.create(AppModule);

  const logger = new Logger('bootstrap');
  app.use(morgan('dev'));
  app.enableCors();

  const swaggerOptions = new DocumentBuilder()
    .setTitle('mCRM by Webkunx')
    .setDescription('My opensource crm created with NestJS, MySQL')
    .setVersion('0.4.1')
    .addTag('crm')
    .build();

  const swagger = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('', app, swagger);

  await app.listen(port);
  logger.log(`App is running on port ${port}`);
}
bootstrap();
