import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://anmolsingh00221:FoodDel123@cluster0.svdfg.mongodb.net/food-del"
    )
    .then(() => {
      console.log("MongoDB connected");
    });
};
