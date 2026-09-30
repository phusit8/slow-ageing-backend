import { UsersSequelizeSchema } from "./users.model.js";
import { MembersSequelizeSchema } from "./members.model.js";
import { ExercisesSequelizeSchema } from "./exercises.model.js";
import { ExerciseStepsSequelizeSchema } from "./exercise-steps.model.js";
import { ExerciseMediaSequelizeSchema } from "./exercise-media.model.js";

/**
 * Sequelize Model Associations
 */

// Exercise <-> ExerciseSteps (1:N)
ExercisesSequelizeSchema.hasMany(ExerciseStepsSequelizeSchema, {
    foreignKey: "exercise_id",
    as: "steps",
});
ExerciseStepsSequelizeSchema.belongsTo(ExercisesSequelizeSchema, {
    foreignKey: "exercise_id",
    as: "exercise",
});

// Exercise <-> ExerciseMedia (1:N)
ExercisesSequelizeSchema.hasMany(ExerciseMediaSequelizeSchema, {
    foreignKey: "exercise_id",
    as: "media",
});
ExerciseMediaSequelizeSchema.belongsTo(ExercisesSequelizeSchema, {
    foreignKey: "exercise_id",
    as: "exercise",
});

export {
    UsersSequelizeSchema,
    MembersSequelizeSchema,
    ExercisesSequelizeSchema,
    ExerciseStepsSequelizeSchema,
    ExerciseMediaSequelizeSchema,
};