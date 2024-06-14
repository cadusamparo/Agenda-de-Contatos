import express from "express";
import { getContatosController, createContatosController, deleteContatosController, updateContatosController } from "../controllers/contatosController.js";
import { loginController, registerController, logoutController } from "../controllers/authController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get('/', auth ,getContatosController);

router.post("/", auth ,createContatosController);

router.put("/:id", auth ,updateContatosController);

router.delete("/:id", auth ,deleteContatosController);

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/logout", auth,logoutController);


export default router;

