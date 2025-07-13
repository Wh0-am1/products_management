import { Router } from "express";
import authUser from "../middleware/auth.middlware";
import fetchProductReviews from "../controller/reviews/reviews.fetchProductReview";
import createReview from "../controller/reviews/reviews.createReview";
import updateReview from "../controller/reviews/reviews.updateReview";
import deleteReview from "../controller/reviews/reviews.deleteReview";

const reviewRouter = Router();

reviewRouter.get("/:id", fetchProductReviews);

//authenticating user
reviewRouter.use(authUser);

reviewRouter.post("/:id", createReview);
reviewRouter.patch("/:id", updateReview);
reviewRouter.delete("/:id", deleteReview);

export default reviewRouter;
