import { NextFunction, Request, Response } from "express";
import { ERROR } from "../../customeType/ERROR";
import { db } from "../../db/db.setup";
import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library";

type Req = Request & { user?: any };

export default async function updateProduct(
  req: Req,
  res: Response,
  next: NextFunction,
) {
  if (req.user && req.user?.role === "ADMIN") {
    const id = req.params.id;

    //parameter is not long enough error
    if (id.length < 32) {
      const error: ERROR = new Error("invalid length id, expected length 32");
      error.statusCode = 400;
      throw error;
    }

    const {
      name,
      description,
      price,
    }: {
      name: string | undefined;
      description: string | undefined;
      price: number | undefined;
    } = req.body ?? {};

    if (!(name || description || price)) {
      const error: ERROR = new Error(
        "pleaser provide atleast one field [ name , description , price ]",
      );
      error.statusCode = 400;
      throw error;
    }

    const updateData: {
      name?: string;
      description?: string;
      price?: number;
    } = {};

    //set the data
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = price;

    const data = await db.products.update({
      where: {
        id,
      },
      data: {
        ...updateData,
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
