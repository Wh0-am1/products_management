//imports
import { NextFunction, Request, Response } from "express";
import { db } from "../../db/db.setup";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SECRET } from "../../config/dotenv.config";
import { ERROR } from "../../customeType/ERROR";

export default async function signUp(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const { email, password }: { email: string; password: string } =
        req.body ?? {};

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
}
