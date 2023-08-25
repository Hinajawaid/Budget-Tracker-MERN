import { Router } from "express";
import { UserSignUp, UserSignIn } from "../controllers/User";
import { auth } from "../middlewares/auth";

const userRouter = Router();

userRouter.post("/signup", UserSignUp);

userRouter.post("/signin", UserSignIn);

export default userRouter;
