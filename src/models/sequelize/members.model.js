import { DataTypes } from "sequelize";
import { sequelize as sqlConfig } from "#configs/sequelize.config.js";

const _TABLE = "members";
const _SCHEMA = "public";

const MembersSequelizeSchema = sqlConfig.define(
    _TABLE,
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        line_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: "",
        },
        full_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        profile_image: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        gender: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        height: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true,
        },
        weight: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true,
        },
        chronic_diseases: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        drug_allergies: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        community: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        consented: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        consented_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
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

MembersSequelizeSchema.sync().then(() => {
    console.log(`${_SCHEMA} - ${_TABLE} Model synced`);
});

export { MembersSequelizeSchema };
