import { DataTypes } from "sequelize";

import { sequelize as sqlConfig } from "#configs/sequelize.config.js";

const _TABLE = "users";
const _SCHEMA = "public";

const UsersSequelizeSchema = sqlConfig.define(
    _TABLE,
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },

        full_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        profile_image: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },

        phone_number: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        position: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },

        department: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },

        community: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },

        role: {
            type: DataTypes.ENUM("admin", "staff"),
            allowNull: false,
            defaultValue: "staff",
        },

        password_hash: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        status: {
            type: DataTypes.ENUM(
                "pending",
                "approved",
                "rejected",
                "suspended",
            ),
            allowNull: false,
            defaultValue: "pending",
        },

        approved_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        approved_by: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },

        created_by: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },

        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        updated_by: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },

        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        deleted_by: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
    },
    {
        schema: _SCHEMA,
        tableName: _TABLE,
        timestamps: false,
    },
);

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    UsersSequelizeSchema.sync().then(() => {
        console.log(`${_SCHEMA} - ${_TABLE} Model synced`);
    }).catch(err => {
        console.warn(`Could not sync ${_TABLE}:`, err.message);
    });
}

export { UsersSequelizeSchema };