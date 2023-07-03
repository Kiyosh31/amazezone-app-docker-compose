import mongoose from 'mongoose'

export default mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.dvnme.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {}
  )
  .then(() => {
    console.log('Connected to DB!')
  })
  .catch((err) => {
    console.log('error connecting to MongoDB', err.message)
  })
