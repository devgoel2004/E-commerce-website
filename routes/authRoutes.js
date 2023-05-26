import express from "express";
import registerController from "../controllers/registerControllers.js";
import loginControllers from "../controllers/loginController.js";
//router object
const router = express.Router();

//routing
//REGISTER || METOD POST
router.post(`/register`, registerController);

//LOGIN || POST
router.post(`/login`, loginControllers);

export default router;
