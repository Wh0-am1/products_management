import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/dotenv.config";

type ERROR = Error & { statusCode?: number };

export default function authUser(
    req: Request & { user?: any },
    res: Response,
    next: NextFunction,
) {
    const auth = req.headers.authorization;
    try {
        if (auth && auth?.startsWith("Bearer")) {
            const token = auth.split(" ")[1];

            const user = jwt.verify(token, SECRET);
            req.user = user;
        } else {
            const error: ERROR = new Error("Not authorized");
            error.statusCode = 401;
            throw error;
        }

        next();
    } catch (err) {
        next(err);
    }
}
