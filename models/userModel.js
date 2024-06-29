import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
const userScema = mongoose.Schema(
  {
    email: {
      validate: [validator.isEmail, 'please, provide valid email'],

      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
userScema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userScema.methods.matchPassword = async function (newPassword) {
  return await bcrypt.compare(newPassword, this.password);
};
const User = mongoose.model('User', userScema);
export default User;
