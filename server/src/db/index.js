import mongoose from "mongoose";
import { MONGO_DB_NAME } from "../utils/constants.js";

async function connectToDatabase() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_DB_URI}/${MONGO_DB_NAME}`
    );

    if (connectionInstance) {
      console.log("Connection to Database succeded");
    }
  } catch (error) {
    console.log(`MongoDB Connection Error: ${error}`);
    process.exit(1);
  }
}

export default connectToDatabase;
