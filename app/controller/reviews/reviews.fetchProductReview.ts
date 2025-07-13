import { Request, Response } from "express";
import { ERROR } from "../../customeType/ERROR";

export default async function fetchProductReviews(req: Request, res: Response) {
    const id = req.params.id;

    if (id.length < 32) {
        const error: ERROR = new Error("invalid length id, expected length 32");
        error.statusCode = 400;
        throw error;
    }

    res.json({
        id,
    });
}
