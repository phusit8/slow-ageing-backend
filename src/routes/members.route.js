import express from "express";
import { methods as membersController } from "#controllers/members.controller.js";

const router = express.Router();

router.get("/api/members/:lineId", membersController.getProfile);
router.post("/api/user/setup", membersController.handleSetup);
router.post("/api/members/setup", membersController.handleSetup);

export { router as membersRouter };
