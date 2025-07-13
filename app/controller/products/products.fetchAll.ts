//imports
import { Request, Response } from "express";
import { db } from "../../db/db.setup";

export default async function fetchAll(req: Request, res: Response) {
    const data = await db.products.findMany();

    if (data.length < 1)
        res.status(200).json({
            success: true,
            message: "No products found",
            data,
        });

    res.status(200).json({
        success: true,
        message: "products fetched successfully",
        data,
    });
}
