import { Router } from "express";
import { loginUser, registerUser, adminLogin } from "../controllers/userController.js";
// import adminAuth from "./../middleware/adminAuth.js";

const userRouter = Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/admin').post(adminLogin);

export default userRouter;