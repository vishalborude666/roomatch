import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const fallbackUri = "mongodb://127.0.0.1:27017/roomatch";
    const rawUri = process.env.MONGO_URI?.trim();
    const isProduction = process.env.NODE_ENV === "production";
    const hasValidUri = rawUri && /^mongodb(\+srv)?:\/\//i.test(rawUri);

    if (!hasValidUri) {
      if (isProduction) {
        throw new Error("MONGO_URI is missing or invalid in production. Set it to your MongoDB Atlas connection string.");
      }

      console.warn(`Using fallback MongoDB URI: ${fallbackUri}`);
    }

    const mongoUri = hasValidUri ? rawUri : fallbackUri;
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
