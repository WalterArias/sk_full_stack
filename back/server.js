import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./products/product.routes.js";
import userRoutes from "./auth/user.routes.js";
import uploadRoutes from "./products/uploadRoutes.js";
import orderRoutes from "./orders/orderRoutes.js";
import swaggerSpec from "./swagger.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/upload", uploadRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`=> Server activo en el puerto ${port}`));
