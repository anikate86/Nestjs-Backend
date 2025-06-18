import * as dotenv from "dotenv";
dotenv.config();

import { DataSourceOptions } from "typeorm";

export const typeOrmConfig: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER || "myuser",
  password: process.env.DB_PASSWORD || "mypassword",
  database: process.env.DB_NAME || "mydatabase",
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: true,
};
