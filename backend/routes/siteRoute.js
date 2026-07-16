import express from "express";
import { getSettings } from "../controllers/siteController.js";

const siteRouter = express.Router();

siteRouter.get('/settings', getSettings);

export default siteRouter;
