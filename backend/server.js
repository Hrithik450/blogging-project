import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./connection.js";
import cors from "cors";
import { ErrorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";

dotenv.config({ path: "./config/config.env" });

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//Routes
import UserRouter from "./routes/user.js";
import BlogRouter from "./routes/blog.js";

const app = express();

connectDB(process.env.MONGO_URL);

const options = {
  origin: "https://blog-frontend-2-dfm4.onrender.com",
  credentials: true,
};

// middlewares
app.use(cors(options));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/blog", BlogRouter);
app.use(ErrorMiddleware);

app.listen(process.env.PORT, () =>
  console.log(`Servern Started! ${process.env.PORT}`)
);
