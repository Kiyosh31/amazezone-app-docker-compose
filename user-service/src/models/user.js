import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlegnth: 5
  },
  email: {
    type: String,
    required: true,
    minlegnth: 5
  },
  password: {
    type: String,
    required: true,
    minlegnth: 5
  }
})

const User = mongoose.model('User', UserSchema)
export default User
