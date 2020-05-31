import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_HOSTNAME,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD || "Astra2000",
  database: process.env.DB_NAME,
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  synchronize: true,
};
