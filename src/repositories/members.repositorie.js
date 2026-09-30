import { MembersSequelizeSchema } from "#models/sequelize/index.sequelize.js";

export const methods = {
    async getByLineId(lineId) {
        try {
            const member = await MembersSequelizeSchema.findOne({
                where: { line_id: lineId, deleted_at: null },
            });
            return { state: true, result: member };
        } catch (error) {
            console.error("MembersRepository getByLineId error:", error);
            return { state: false, result: error };
        }
    },

    async getById(id) {
        try {
            const member = await MembersSequelizeSchema.findOne({
                where: { id: id, deleted_at: null },
            });
            return { state: true, result: member };
        } catch (error) {
            console.error("MembersRepository getById error:", error);
            return { state: false, result: error };
        }
    },

    async createOrUpdate(data) {
        try {
            if (data.line_id) {
                const existing = await MembersSequelizeSchema.findOne({
                    where: { line_id: data.line_id, deleted_at: null },
                });
                if (existing) {
                    await MembersSequelizeSchema.update(
                        {
                            ...data,
                            updated_at: new Date(),
                        },
                        {
                            where: { id: existing.id },
                        }
                    );
                    const updated = await MembersSequelizeSchema.findOne({
                        where: { id: existing.id },
                    });
                    return { state: true, result: updated };
                }
            }

            const created = await MembersSequelizeSchema.create({
                ...data,
                created_at: new Date(),
            });
            return { state: true, result: created };
        } catch (error) {
            console.error("MembersRepository createOrUpdate error:", error);
            return { state: false, result: error };
        }
    },
};
