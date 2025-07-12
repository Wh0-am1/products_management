import { Router } from "express";
import { db } from "../db/db.setup";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SECRET } from "../config/dotenv.config";

type ERROR = Error & { statusCode?: number };

const authRouter = Router();

//sign-up
authRouter.post("/sign-up", async (req, res, next) => {
    const {
        name,
        email,
        password,
    }: { name: string; email: string; password: string } = req.body;

    try {
        if (!(name && email && password)) {
            const error: ERROR = new Error(
                `please provide ${name ? "" : "[name]"} ${email ? "" : "[email]"} ${password ? "" : "[password]"} `,
            );
            error.statusCode = 400;
            throw error;
        }
        //name validatoin
        if (name.length < 2) {
            const error: ERROR = new Error("name is too short");
            error.statusCode = 400;
            throw error;
        }
        //email validatoin
        const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            const error: ERROR = new Error("invalid email");
            error.statusCode = 400;
            throw error;
        }

        //password validation
        if (password.length < 6) {
            const error: ERROR = new Error("password is too short");
            error.statusCode = 400;
            throw error;
        }

        //password encryption
        const Salt = await bcrypt.genSalt(10);
        const hashPwd = await bcrypt.hash(password, Salt);

        //data creation

        const User = await db.user.create({
            data: {
                name,
                email,
                password: hashPwd,
            },
        });

        //generate Token
        const token = jwt.sign({ userId: User.id, role: User.role }, SECRET, {
            expiresIn: "7d",
        });

        res.status(201).json({
            success: true,
            message: "user successfully created",
            data: {
                token,
                user: {
                    name,
                    email,
                },
            },
        });
    } catch (err) {
        next(err);
    }
});

//sign-in
authRouter.post("/sign-in", async (req, res, next) => {
    try {
        const { email, password }: { email: string; password: string } = req.body;

        if (!(email && password)) {
            const error: ERROR = new Error(
                `please provide ${email ? "" : "[email]"} ${password ? "" : "[password]"}`,
            );
            error.statusCode = 400;
            throw error;
        }

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            const error: ERROR = new Error("invalid email");
            error.statusCode = 400;
            throw error;
        }

        if (password.length < 6) {
            const error: ERROR = new Error("password is too short");
            error.statusCode = 400;
            throw error;
        }

        const user = await db.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            const error: ERROR = new Error("user not found");
            error.statusCode = 401;
            throw error;
        }
        const key = await bcrypt.compare(password, user.password);

        if (!key) {
            const error: ERROR = new Error("password incorrect");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, SECRET);
        res.status(200).json({
            success: true,
            message: "user signed successfully",
            token,
            data: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        next(err);
    }
});
authRouter.post("/sign-out", async (req, res, next) => { });

export default authRouter;
