//imports
import { Request, Router } from "express";
import authUser from "../middleware/auth.middlware";
import addProduct from "../controller/products/products.add";
import updateProduct from "../controller/products/products.update";
import deleteProduct from "../controller/products/products.delete";
import fetchAll from "../controller/products/products.fetchAll";
import singleProduct from "../controller/products/products.single";

const productsRouer = Router();

productsRouer.get("/", fetchAll);
productsRouer.get("/:id", singleProduct);

//authenticate ADMIN
productsRouer.use(authUser);

//ADMIN only Panle
productsRouer.post("/add", addProduct);
productsRouer.patch("/update/:id", updateProduct);
productsRouer.delete("/delete/:id", deleteProduct);

export default productsRouer;
