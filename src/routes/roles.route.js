/**
 * Import libraries or resources
 */
import express from "express";
import { methods as controller } from "../controllers/roles.controller.js"

const basePath = "/roles";
const router = express.Router();


router.get(`${basePath}`, controller.onGetAll)

router.post(
    `${basePath}`, controller.create
);


export { router };