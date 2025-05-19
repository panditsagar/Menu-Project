import express from "express";

import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { getItemsByCategory, postItems } from "../controllers/item.controllers.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postItems);
router.route("/get/:id").get(isAuthenticated, getItemsByCategory);
export default router;
