//imports
import { Router } from "express";
import signIn from "../controller/auth/auth.signIn";
import signUp from "../controller/auth/auth.signUp";

const authRouter = Router();

//sign-up
authRouter.post("/sign-up", signIn);
//sign-in
authRouter.post("/sign-in", signUp);
authRouter.post("/sign-out", async (req, res, next) => { });

export default authRouter;
