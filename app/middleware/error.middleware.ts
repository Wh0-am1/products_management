import { NextFunction, Request, Response } from "express";
import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";

type ERROR = Error & {
    statusCode?: number;
};

export default function ErrorHandler(
    err: ERROR,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    let error: ERROR = err;
    //already exist error
    if (err instanceof PrismaClientKnownRequestError && err?.code === "P2002") {
        error = new Error(`${err?.meta?.target ?? ""} already exist`);
        error.statusCode = 409;
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "server Error",
    });
}
