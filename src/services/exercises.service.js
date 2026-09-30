import { methods as exercisesRepo } from "#repositories/exercises.repositorie.js";

export const methods = {
    async getActiveExercises() {
        try {
            const result = await exercisesRepo.getAllActive();
            if (result.state) {
                return { code: 200, data: result.result };
            }
            return { code: 500, data: [] };
        } catch (error) {
            console.error("ExercisesService getActiveExercises error:", error);
            return { code: 500, data: [] };
        }
    },

    async getExerciseById(id) {
        try {
            const result = await exercisesRepo.getById(id);
            if (result.state && result.result) {
                return { code: 200, data: result.result };
            }
            return { code: 404, data: null };
        } catch (error) {
            console.error("ExercisesService getExerciseById error:", error);
            return { code: 500, data: null };
        }
    },
};
