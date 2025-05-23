import express from "express";
import {
  deleteCategory,
  getAllCategories,
  postCategories,
} from "../controllers/categories.controllers.js";
import { singleUpload } from "../utils/multer.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, singleUpload, postCategories);
router.route("/getall").get(isAuthenticated, getAllCategories);
router.route("/delete/:id").delete(isAuthenticated, deleteCategory);

export default router;
