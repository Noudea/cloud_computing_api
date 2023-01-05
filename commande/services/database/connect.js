import mongoose from "mongoose"


const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL)
    console.log('Successfully connected to database')
  } catch (err) {
    console.log(err)
  }
}


export default connectToDatabase