import express from "express";
import { PORT } from "./config/dotenv.config";
import ErrorHandler from "./middleware/error.middleware";
import authRouter from "./route/auth.route";
import productsRouer from "./route/products.route";
import reviewRouter from "./route/review.route";

const app = express();

//bodyParser
app.use(express.json());

//middlewares
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productsRouer);
app.use("/api/v1/reviews", reviewRouter);

//error handling
app.use(ErrorHandler);

app.listen(PORT, () => {
    console.log(`listening ${PORT}`);
});
