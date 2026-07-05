import mongoose from 'mongoose';

// Connect to MongoDB Atlas using the connection string from the environment.
export async function connectDB() {
  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI is not set. Please add a valid MongoDB Atlas connection string to the backend .env file.');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}
