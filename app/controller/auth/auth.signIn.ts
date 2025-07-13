//import
import { NextFunction, Request, Response } from "express";
import { db } from "../../db/db.setup";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SECRET } from "../../config/dotenv.config";

type ERROR = Error & { statusCode?: number };

export default async function signIn(
    req: Request,
    res: Response,
    next: NextFunction,
) {
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
}
