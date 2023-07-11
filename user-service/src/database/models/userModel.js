import mongoose from 'mongoose'
import Password from '../../utils/password.js'

const UserSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: {
      transform(doc, ret) {
        // ret.id -= ret._id
        // delete ret._id
        delete ret.password
        delete ret.__v
      }
    }
  }
)

UserSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }

  done()
})

const User = mongoose.model('User', UserSchema)
export default User
