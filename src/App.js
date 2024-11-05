import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import authRoutes from "./routes/auth.routes.js";
import recipeRoutes from "./routes/recipe.routes.js";
import categoryRoutes from "./routes/category.routes.js";

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", recipeRoutes);
app.use("/api", categoryRoutes);


export default app;
