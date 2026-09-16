import express from "express";
import { router as roleRouter } from "./roles.route.js"

const router = express.Router();
router.use(roleRouter);

export { router };