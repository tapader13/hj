import mongoose from 'mongoose';
import validator from 'validator';
const contactScema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Contact = mongoose.model('Contact', contactScema);
export default Contact;
