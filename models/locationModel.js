import mongoose from 'mongoose';
const locationScema = mongoose.Schema(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
    checked: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);
const Location = mongoose.model('Location', locationScema);
export default Location;
