import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/Ingrecipes");
    console.log("Connected");
  } catch (error) {
    console.log(error);
  }
};
