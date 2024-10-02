"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../controllers/User");
const userRouter = (0, express_1.Router)();
userRouter.get("/", User_1.helloWorld);
userRouter.post("/signup", User_1.UserSignUp);
userRouter.post("/signin", User_1.UserSignIn);
exports.default = userRouter;
