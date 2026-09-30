import { DataTypes } from "sequelize";
import { sequelize as sqlConfig } from "#configs/sequelize.config.js";

const _TABLE = "exercise_steps";
const _SCHEMA = "public";

const ExerciseStepsSequelizeSchema = sqlConfig.define(
    _TABLE,
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        step_no: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        exercise_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
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
    ExerciseStepsSequelizeSchema.sync().then(() => {
        console.log(`${_SCHEMA} - ${_TABLE} Model synced`);
    }).catch(err => {
        console.warn(`Could not sync ${_TABLE}:`, err.message);
    });
}

export { ExerciseStepsSequelizeSchema };
