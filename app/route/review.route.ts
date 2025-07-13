import { Router } from "express";
import authUser from "../middleware/auth.middlware";

const reviewRouter = Router();

reviewRouter.get("/:id", (req, res, next) => {
    res.send("review of the product");
});

//authenticating user
reviewRouter.use(authUser);

reviewRouter.post("/:id", (req, res, next) => {
    res.send("create review of the product");
});
reviewRouter.put("/:id", (req, res, next) => {
    res.send("update review of the product");
});
reviewRouter.delete("/:id", (req, res, next) => {
    res.send("delete review of the product");
});

export default reviewRouter;
