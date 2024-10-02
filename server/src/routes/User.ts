import { Router } from "express";
import { UserSignUp, UserSignIn, helloWorld } from "../controllers/User";
import { auth } from "../middlewares/auth";

const userRouter = Router();
userRouter.get("/", helloWorld);

userRouter.post("/signup", UserSignUp);

userRouter.post("/signin", UserSignIn);

export default userRouter;
