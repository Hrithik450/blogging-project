import mongoose from "mongoose";
import { CatchAsyncError } from "./middlewares/asyncerror.js";

export const connectDB = CatchAsyncError((url) => {
  return mongoose.connect(url).then(() => console.log("mongoose connected!"));
});
