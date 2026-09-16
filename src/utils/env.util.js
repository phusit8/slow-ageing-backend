
import dotenv from "dotenv";
dotenv.config({
     path: "./src/configs/.env",
});

console.log(
     process.env.DB_DATABASE,
     process.env.DB_USERNAME,
     process.env.DB_PASSWORD,
     process.env.DB_HOST,
     process.env.DB_PORT,
     process.env.DB_TYPE,
     process.env.SEQUELIZE_MIN,
     process.env.SEQUELIZE_MAX,
     process.env.SEQUELIZE_IDLE,
     process.env.SEQUELIZE_ACQUIRE,)
console.log(123);

export const PASSPHRASE = process.env.PASSPHRASE;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_TYPE = process.env.DB_TYPE;
export const SEQUELIZE_MIN = process.env.SEQUELIZE_MIN;
export const SEQUELIZE_MAX = process.env.SEQUELIZE_MAX;
export const SEQUELIZE_IDLE = process.env.SEQUELIZE_IDLE;
export const SEQUELIZE_ACQUIRE = process.env.SEQUELIZE_ACQUIRE;