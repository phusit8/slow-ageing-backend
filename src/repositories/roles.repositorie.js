import { UsersSequelizeSchema } from "#models/sequelize/index.sequelize.js";

export const methods = {
    async getall(option = { limit: 10, offset: 0 }) {
        try {
            const { count, rows } = await UsersSequelizeSchema.findAndCountAll({
                limit: option.limit,
                offset: option.offset,
                order: [["created_at", "desc"]],
            });
            return { state: true, result: { count, rows } };
        } catch (error) {
            console.error(error);
            return { state: false };
        }
    },

    async create(data) {
        try {
            const payload = {
                created_at: new Date(),
                created_by: data.created_by,
                ...data,
            };
            const result = await UsersSequelizeSchema.create(payload, {
                returning: true,
            });
            return { state: true, result: result };
        } catch (error) {
            console.error(error);
            return { state: false };
        }
    },

    async update(id, data) {
        try {
            const payload = {
                updated_at: new Date(),
                updated_by: data.updated_by,
                ...data,
            };
            const { count, rows } = await UsersSequelizeSchema.update(payload, {
                where: { id: id },
                returning: true,
            });
            return { state: true, result: { count, rows } };
        } catch (error) {
            console.error(error);
            return { state: false };
        }
    },

    async delete(id) {


        try {
            const result = await UsersSequelizeSchema.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {

            console.error(error);

            return {
                state: true, result: result
            }
        }
    }
};
