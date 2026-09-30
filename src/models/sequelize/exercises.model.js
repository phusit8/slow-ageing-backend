import { DataTypes } from "sequelize";
import { sequelize as sqlConfig } from "#configs/sequelize.config.js";

const _TABLE = "exercises";
const _SCHEMA = "public";

const ExercisesSequelizeSchema = sqlConfig.define(
    _TABLE,
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10,
        },
        unit: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: "ครั้ง",
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        duration_unit: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: "นาที",
        },
        difficulty: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: "easy",
        },
        color: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: "#16a34a",
        },
        media_type: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: "none",
        },
        instruction: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        created_by: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 1,
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
    }
);

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    ExercisesSequelizeSchema.sync().then(() => {
        console.log(`${_SCHEMA} - ${_TABLE} Model synced`);
    }).catch(err => {
        console.warn(`Could not sync ${_TABLE}:`, err.message);
    });
}

export { ExercisesSequelizeSchema };
