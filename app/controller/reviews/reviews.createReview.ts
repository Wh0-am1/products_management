import { Request, Response } from "express";
import { ERROR } from "../../customeType/ERROR";
import { db } from "../../db/db.setup";

export default async function createReview(
  req: Request & { user?: any },
  res: Response,
) {
  const id = req.params.id;

  if (id.length < 32) {
    const error: ERROR = new Error("invalid length id, expected length 32");
    error.statusCode = 400;
    throw error;
  }
  //REGULAR check
  if (req.user.role && req.user.role !== "REGULAR") {
    const error: ERROR = new Error("you are must be a normal user");
    error.statusCode = 409;
    throw error;
  }

  const { feedback, rating }: { feedback: string; rating: number } =
    req.body || {};

  if (!(feedback && rating)) {
    const error: ERROR = new Error("feedback and rating required");
    error.statusCode = 400;
    throw error;
  }

  if (feedback.length < 3 || rating < 0 || rating > 5) {
    const error: ERROR = new Error(
      "feedback must more than 3 character and rating should be 1-5",
    );
    error.statusCode = 400;
    throw error;
  }

  const data = await db.reviews.create({
    data: {
      feedback,
      rating,
      userId: req.user.userId,
      productId: id,
    },
    select: {
      id: true,
      feedback: true,
      rating: true,
      productId: true,
    },
  });

  res.status(201).json({
    success: true,
    message: "Review created successfully",
    data,
  });
}
