import mongoose from 'mongoose'

export default mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log('Connected to DB!')
  })
  .catch((err) => {
    console.log('error connecting to MongoDB', err.message)
  })
