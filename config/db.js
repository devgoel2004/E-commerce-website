import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.db);
    console.log(`Connected to Mongodb Database`.bgGreen.black);
  } catch (err) {
    console.log(`Error in MongoDB connection`);
  }
};
export default connectDB;
