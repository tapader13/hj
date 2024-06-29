import mongoose from 'mongoose';
const categoriScema = mongoose.Schema(
  {
    name: { type: String, required: true },
    href: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Categorie = mongoose.model('Categorie', categoriScema);
export default Categorie;
