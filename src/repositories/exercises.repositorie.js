import {
    ExercisesSequelizeSchema,
    ExerciseStepsSequelizeSchema,
    ExerciseMediaSequelizeSchema,
} from "#models/sequelize/index.sequelize.js";

export const methods = {
    async getAllActive() {
        try {
            const rows = await ExercisesSequelizeSchema.findAll({
                where: {
                    active: true,
                    deleted_at: null,
                },
                include: [
                    {
                        model: ExerciseStepsSequelizeSchema,
                        as: "steps",
                        where: { deleted_at: null },
                        required: false,
                    },
                    {
                        model: ExerciseMediaSequelizeSchema,
                        as: "media",
                        where: { deleted_at: null },
                        required: false,
                    },
                ],
                order: [
                    ["id", "ASC"],
                    [{ model: ExerciseStepsSequelizeSchema, as: "steps" }, "step_no", "ASC"],
                    [{ model: ExerciseMediaSequelizeSchema, as: "media" }, "sort_order", "ASC"],
                ],
            });
            return { state: true, result: rows };
        } catch (error) {
            console.error("ExercisesRepository getAllActive error:", error);
            return { state: false, result: error };
        }
    },

    async getById(id) {
        try {
            const result = await ExercisesSequelizeSchema.findOne({
                where: {
                    id: id,
                    deleted_at: null,
                },
                include: [
                    {
                        model: ExerciseStepsSequelizeSchema,
                        as: "steps",
                        where: { deleted_at: null },
                        required: false,
                    },
                    {
                        model: ExerciseMediaSequelizeSchema,
                        as: "media",
                        where: { deleted_at: null },
                        required: false,
                    },
                ],
                order: [
                    [{ model: ExerciseStepsSequelizeSchema, as: "steps" }, "step_no", "ASC"],
                    [{ model: ExerciseMediaSequelizeSchema, as: "media" }, "sort_order", "ASC"],
                ],
            });
            return { state: true, result };
        } catch (error) {
            console.error("ExercisesRepository getById error:", error);
            return { state: false, result: error };
        }
    },
};
