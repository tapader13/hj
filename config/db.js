import mongoose from 'mongoose';
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoose connect at ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error occured at ${error.message}`);
    process.exit(1);
  }
};
export default connectDb;
