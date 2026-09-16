import { DB_DATABASE, DB_HOST, DB_PORT } from "#utils/env.util.js";
import { sequelize } from "./sequelize.config.js";

export const IndexConfig = {

    async connectDBViaSequelize() {
        try {
            await sequelize.authenticate();
            console.log(`Sequelize@${DB_HOST}:${DB_PORT} : DB ${DB_DATABASE} : Connecting database successful`);


            return true;
        } catch (error) {
            console.error(`Database connection error: ${error.message}`);
            return false;
        }
    },
};