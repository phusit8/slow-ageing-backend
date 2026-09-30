import { Sequelize } from "sequelize";
import {
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_TYPE,
    SEQUELIZE_MIN,
    SEQUELIZE_MAX,
    SEQUELIZE_IDLE,
    SEQUELIZE_ACQUIRE,
} from "#utils/env.util.js";


/**
 * * Sequelize Instance Configuration
 * * สร้างการเชื่อมต่อฐานข้อมูลหลักของระบบ พร้อมระบบ Connection Pooling
 * * @type {Sequelize}
 * @property {string} host - ที่อยู่ของ Database Server
 * @property {number} port - พอร์ตที่ใช้เชื่อมต่อ
 * @property {string} dialect - ประเภทของฐานข้อมูล (เช่น mysql, postgres, mariadb)
 * @property {boolean} logging - ปิดการแสดง SQL log ใน Console เพื่อประสิทธิภาพ
 * @property {object} pool - การตั้งค่าระบบจัดการคิวการเชื่อมต่อ (Connection Pool)
 * @property {number} pool.max - จำนวนการเชื่อมต่อสูงสุดที่อนุญาตให้มีได้พร้อมกัน
 * @property {number} pool.min - จำนวนการเชื่อมต่อขั้นต่ำที่จะเปิดค้างไว้เสมอ
 * @property {number} pool.acquire - เวลาสูงสุด (ms) ที่จะรอเพื่อให้ได้การเชื่อมต่อก่อนจะพ่น Error
 * @property {number} pool.idle - เวลาสูงสุด (ms) ที่การเชื่อมต่อสามารถปล่อยว่างได้ก่อนจะถูกปิดลง
 */
console.log("HI")
console.log(DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_TYPE,
    SEQUELIZE_MIN,
    SEQUELIZE_MAX,
    SEQUELIZE_IDLE,
    SEQUELIZE_ACQUIRE,)

export const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: parseInt(DB_PORT) || 5432,
    dialect: DB_TYPE || "postgres",
    logging: false,
    dialectOptions: (process.env.DB_SSL === "true" || (process.env.NODE_ENV === "production" && DB_HOST !== "localhost")) ? {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    } : {},
    pool: {
        max: parseInt(SEQUELIZE_MAX) || 10,
        min: parseInt(SEQUELIZE_MIN) || 0,
        acquire: parseInt(SEQUELIZE_ACQUIRE) || 30000,
        idle: parseInt(SEQUELIZE_IDLE) || 10000,
    },
});