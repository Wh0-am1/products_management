import { NextFunction, Request, Response } from "express";
import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";
import { ERROR } from "../customeType/ERROR";

export default function ErrorHandler(
    err: ERROR,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const error: ERROR = err;
    //already exist error
    if (err instanceof PrismaClientKnownRequestError) {
        const code = err.code;

        switch (code) {
            case "P2002":
                error.message = `${err?.meta?.target ?? ""} already exist`;
                error.statusCode = 409;
                break;
            case "P2025":
                error.message = err.meta?.cause as string;
                error.statusCode = 409;
                break;
        }
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "server Error",
    });
}
