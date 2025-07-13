import { Request, Response } from "express";
import { db } from "../../db/db.setup";
import { ERROR } from "../../customeType/ERROR";

export default async function singleProduct(req: Request, res: Response) {
    const id = req.params?.id;

    //parameter is not long enough error
    if (id.length < 32) {
        const error: ERROR = new Error("invalid length id, expected length 32");
        error.statusCode = 400;
        throw error;
    }

    const data = await db.products.findUnique({
        where: {
            id,
        },
    });

    //no data found
    if (!data) {
        const error: ERROR = new Error("Not found");
        error.statusCode = 404;
        throw error;
    }

    res.json({
        success: true,
        message: "product fetched successfully",
        data,
    });
}
