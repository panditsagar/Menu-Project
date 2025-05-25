import express from "express";

import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  deleteItem,
  getItemsByCategory,
  postItems,
  updateItem,
} from "../controllers/item.controllers.js";
import { singleUpload } from "../utils/multer.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, singleUpload, postItems);
router.route("/get/:id").get(isAuthenticated, getItemsByCategory);
router.route("/delete/:id").delete(isAuthenticated, deleteItem);
router.route("/update/:id").put(isAuthenticated, singleUpload, updateItem);
export default router;
