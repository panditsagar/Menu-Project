import express from "express";
import { login ,checkAuth, logout} from "../controllers/admin.controllers.js";
 
const router = express.Router();

router.route("/login").post(login);
router.route("/check").get(checkAuth);
router.route("/logout").post(logout);

export default router;
