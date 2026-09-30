import express from "express";
import { methods as exercisesController } from "#controllers/exercises.controller.js";

const router = express.Router();

router.get("/api/exercises", exercisesController.getActive);
router.get("/api/exercises/:id", exercisesController.getById);

export { router as exercisesRouter };
