


import { DataTypes } from "sequelize";

import { sequelize as sqlConfig } from "#configs/sequelize.config.js";





const _TABLE = "roles";
const _SCHEMA = "master_data";
/**
 * * Roles Sequelize Model
 * * นิยามโครงสร้างตารางบทบาทหน้าที่ (Roles) เพื่อใช้ในการควบคุมการเข้าถึงระบบ
 * * @typedef {Object} RolesModel
 * @property {UUID} id - Unique identifier (UUID v7)
 * @property {string} code - รหัสอ้างอิงของบทบาท (เช่น 'ADMIN', 'USER')
 * @property {Object} name - ชื่อบทบาท เก็บเป็น JSON เพื่อรองรับหลายภาษา (Multi-language)
 * @property {string} created_by - UUID ของผู้สร้างรายการนี้
 * @property {Date} created_at - วันที่และเวลาที่สร้างรายการ
 * @property {string} [updated_by] - UUID ของผู้แก้ไขรายการล่าสุด
 * @property {Date} [updated_at] - วันที่และเวลาที่แก้ไขล่าสุด
 * @property {boolean} visible_flag - แฟล็กเปิด/ปิด การแสดงผลรายการบนระบบหน้าบ้าน
 * @property {'PENDING'|'ACTIVE'|'INACTIVE'|'SUSPENDED'|'TERMINATED'} status - สถานะปัจจุบันของแปลงเพาะปลูก
 * @property {string} [status_modified_by] - UUID ของผู้ปรับเปลี่ยนสถานะล่าสุด
 * @property {Date} [status_modified_at] - วันที่และเวลาที่ปรับเปลี่ยนสถานะล่าสุด
 */
const RolesSequelizeSchema = sqlConfig.define(
    _TABLE,
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        community_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
        username: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
        email: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        gender: {
            type: DataTypes.CHAR,
            allowNull: false,
        },
        congenital_disease: {
            type: DataTypes.CHAR,
            allowNull: false,
        },
        drug_allergy: {
            type: DataTypes.CHAR,
            allowNull: false,
        },
        weight: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        heigh: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        created_by: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "00000000-0000-0000-0000-000000000001",
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_by: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
        operation_flag: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        immutable_flag: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        visible_flag: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        status: {
            type: DataTypes.ENUM(
                "PENDING",
                "ACTIVE",
                "INACTIVE",
                "SUSPENDED",
                "TERMINATED",
            ),
            allowNull: false,
            defaultValue: "ACTIVE",
        },
        status_modified_by: {
            type: DataTypes.STRING,
            allowNull: true,
            // defaultValue: "00000000-0000-0000-0000-000000000001",
            // defaultValue: null,
        },
        status_modified_at: {
            type: DataTypes.DATE,
            allowNull: true,
            // defaultValue: null,
        },
    },
    {
        schema: _SCHEMA,
        tableName: _TABLE,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    },
);

RolesSequelizeSchema.sync().then(() => {
    console.log(
        `${(_SCHEMA)} - ${(`${_TABLE} Model synced`)}`,
    );
});

export { RolesSequelizeSchema };
