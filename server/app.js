import express from "express";
import cors from "cors";
import userRouter from "./routers/auth.router.js";
import errorHandler from "./middleware/error.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", userRouter);
app.use(errorHandler);

export default app;
