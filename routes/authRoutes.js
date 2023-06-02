import express from "express";
import registerController from "../controllers/registerControllers.js";
import loginControllers from "../controllers/loginController.js";
import testController from "../controllers/testController.js";
import requireSignIn from "../middlewares/authMiddleware.js";
import isAdmin from "../middlewares/adminAccessMiddleware.js";
import forgotPasswordController from "../controllers/forgotPasswordController.js";
//router object
const router = express.Router();

//routing
//REGISTER || METOD POST
router.post(`/register`, registerController);

//LOGIN || POST
router.post(`/login`, loginControllers);
//forget password || post
router.post(`/forgot-password`, forgotPasswordController);
//test router
router.get("/test", requireSignIn, isAdmin, testController);

//protected route auth
router.get(`/user-auth`, requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get(`/admin-auth`, requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
