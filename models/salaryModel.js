import mongoose from 'mongoose';
const salaryScema = mongoose.Schema(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
    checked: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);
const Salary = mongoose.model('Salary', salaryScema);
export default Salary;
