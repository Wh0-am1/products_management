//import
import { NextFunction, Request, Response } from "express";
import { db } from "../../db/db.setup";
import { ERROR } from "../../customeType/ERROR";

type Req = Request & { user?: any };

export default async function addProduct(
    req: Req,
    res: Response,
    next: NextFunction,
) {
    if (req.user && req.user?.role === "ADMIN") {
        const {
            name,
            description,
            price,
        }: { name: string; description: string; price: number } = req.body ?? {};

        if (!(name && description && price)) {
            const error: ERROR = new Error("name,description and price required");
            error.statusCode = 400;
            throw error;
        }

        const data = await db.products.create({
            data: {
                name,
                description,
                price,
            },
        });

        res.status(200).json({
            success: true,
            message: "product created successfully",
            data,
        });
    } else {
        const error: ERROR = new Error("Not authorized");
        error.statusCode = 401;
        throw error;
    }
}
