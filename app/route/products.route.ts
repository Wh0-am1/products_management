import { Request, Router } from "express";
import authUser from "../middleware/auth.middlware";

type Req = Request & { user?: any };
type ERROR = Error & { statusCode?: number };

const productsRouer = Router();

productsRouer.get("/", async (req, res) => {
    res.send("all products");
});
productsRouer.get("/:id", async (req, res) => {
    res.send("single product");
});

//authenticate ADMIN
productsRouer.use(authUser);

//ADMIN only Panle
productsRouer.post("/add", async (req: Req, res, next) => {
    try {
        if (req.user && req.user?.role === "ADMIN") {
            res.send("create product");
        } else {
            const error: ERROR = new Error("Not authorized");
            error.statusCode = 401;
            throw error;
        }
    } catch (err) {
        next(err);
    }
});
productsRouer.put("/update/:id", async (req: Req, res, next) => {
    try {
        if (req.user && req.user?.role === "ADMIN") {
            res.send("update product");
        } else {
            const error: ERROR = new Error("Not authorized");
            error.statusCode = 401;
            throw error;
        }
    } catch (err) {
        next(err);
    }
});
productsRouer.post("/delete/:id", async (req: Req, res, next) => {
    try {
        if (req.user && req.user?.role === "ADMIN") {
            res.send("delete product");
        } else {
            const error: ERROR = new Error("Not authorized");
            error.statusCode = 401;
            throw error;
        }
    } catch (err) {
        next(err);
    }
});

export default productsRouer;
