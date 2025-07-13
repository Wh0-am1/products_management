import { NextFunction, Request, Response } from "express";
import { ERROR } from "../../customeType/ERROR";
import { db } from "../../db/db.setup";

type Req = Request & { user?: any };

export default async function deleteReview(
  req: Req,
  res: Response,
  next: NextFunction,
) {
  if (req.user && req.user?.role === "REGULAR") {
    const id = req.params.id;

    //parameter is not long enough error
    if (id.length < 32) {
      const error: ERROR = new Error("invalid length id, expected length 32");
      error.statusCode = 400;
      throw error;
    }
    const data = await db.reviews.delete({
      where: {
        id,
        userId: req.user.userId,
      },
    });

    res.status(200).json({
      success: true,
      message: "review deleted successfully",
      data,
    });
  } else {
    const error: ERROR = new Error("Not authorized");
    error.statusCode = 401;
    throw error;
  }
}
