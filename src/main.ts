import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger } from "@nestjs/common";
import * as morgan from "morgan";

const bootstrap = async () => {
  const port = process.env.PORT;

  const app = await NestFactory.create(AppModule);

  const logger = new Logger("bootstrap");
  app.use(morgan("dev"));
  app.enableCors();

  const swaggerOptions = new DocumentBuilder()
    .setTitle("mCRM by Webkunx")
    .setDescription("My open source crm created with NestJS and Postgres")
    .setVersion("0.4.1")
    .addTag("crm")
    .build();

  const swagger = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup("", app, swagger);

  await app.listen(port);
  logger.log(`App is running on port ${port}`);
};
bootstrap();
