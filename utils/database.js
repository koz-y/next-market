import mongoose from "mongoose"
import config from "../config/dev"

const connectDB = async () => {
  //   console.log(config.DB_URI)
  try {
    await mongoose.connect(config.DB_URI)
    console.log("Success: Connected to MongoDB")
  } catch (err) {
    console.log("Failure: Unconnected to MongoDB")
  }
}

export default connectDB
