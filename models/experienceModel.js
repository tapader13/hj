import mongoose from 'mongoose';
const experienceScema = mongoose.Schema(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
    checked: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);
const Experience = mongoose.model('Experience', experienceScema);
export default Experience;
