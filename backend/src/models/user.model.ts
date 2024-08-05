import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
export interface IUser extends Document {
  _id: string
  firstName: string
  lastName: string
  username: string
  password?: string
  avatar: string
  email: string
  faceDescriptors?: any
  googleId?: string
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, min: [1, 'Name too short.'] },
    lastName: { type: String, min: [1, 'Name too short.'] },
    username: {
      type: String,
      min: [4, 'Username is too short.'],
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: [8, 'Min length of password should be 8.'],
      max: [40, 'Max length of password should be 40.'],
      validate: {
        validator: function (value: string) {
          return this.googleId || value != null
        },
        message: 'Password is required for traditional signups.',
      },
    },
    avatar: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    faceDescriptors: { type: Array },
    googleId: { type: String },
  },
  { timestamps: true }
)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})
userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

export { User }
