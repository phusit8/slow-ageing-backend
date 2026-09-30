import express from "express";
import { router as roleRouter } from "./roles.route.js";
import { exercisesRouter } from "./exercises.route.js";
import { membersRouter } from "./members.route.js";
import { viewRouter } from "./views.route.js";

const router = express.Router();

router.use(roleRouter);
router.use(exercisesRouter);
router.use(membersRouter);
router.use(viewRouter);

export { router };