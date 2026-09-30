
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
dotenv.config({
     path: path.resolve(__dirname, "../configs/.env"),
});

export const PASSPHRASE = process.env.PASSPHRASE || "";
export const DB_DATABASE = process.env.DB_DATABASE || "slowageing";
export const DB_USERNAME = process.env.DB_USERNAME || "postgres";
export const DB_PASSWORD = process.env.DB_PASSWORD || "12345678";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = process.env.DB_PORT || 5432;
export const DB_TYPE = process.env.DB_TYPE || "postgres";
export const SEQUELIZE_MIN = process.env.SEQUELIZE_MIN || "0";
export const SEQUELIZE_MAX = process.env.SEQUELIZE_MAX || "10";
export const SEQUELIZE_IDLE = process.env.SEQUELIZE_IDLE || "10000";
export const SEQUELIZE_ACQUIRE = process.env.SEQUELIZE_ACQUIRE || "30000";