import { Request, Response } from "express";
import { ERROR } from "../../customeType/ERROR";
import { db } from "../../db/db.setup";

export default async function updateReview(
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

  if (!(feedback || rating)) {
    const error: ERROR = new Error(
      "please provide atleast one field [ feedback , rating ]",
    );
    error.statusCode = 400;
    throw error;
  }

  //feedback lenght check
  if (feedback && feedback.length < 3) {
    const error: ERROR = new Error("feedback is too short");
    error.statusCode = 400;
    throw error;
  }
  //rating scale check
  if ((rating && rating < 0) || rating > 5) {
    const error: ERROR = new Error("rating should be 1-5");
    error.statusCode = 400;
    throw error;
  }
  const updateData: {
    feedback?: string;
    rating?: number;
  } = {};

  //set the data
  if (feedback) updateData.feedback = feedback;
  if (rating) updateData.rating = rating;

  const data = await db.reviews.update({
    where: {
      id,
      userId: req.user.userId,
    },
    data: {
      ...updateData,
    },
    select: {
      id: true,
      feedback: true,
      rating: true,
      productId: true,
    },
  });

  res.status(200).json({
    success: true,
    message: "Review update successfully",
    data,
  });
}
