import { methods as exercisesService } from "#services/exercises.service.js";

export const methods = {
    async getActive(req, res) {
        try {
            const result = await exercisesService.getActiveExercises();
            return res.status(result.code).json(result.data);
        } catch (error) {
            console.error("ExercisesController getActive error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const result = await exercisesService.getExerciseById(id);
            return res.status(result.code).json(result.data);
        } catch (error) {
            console.error("ExercisesController getById error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
};
