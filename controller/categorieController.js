import asyncHandler from 'express-async-handler';
import Categorie from '../models/categorieModel.js';
//@ post
//@ categorie/createcat
//@ private
const createCategorie = asyncHandler(async (req, res) => {
  const { name, href } = req.body;
  const catExists = await Categorie.findOne({ name });
  if (catExists) {
    res.status(400);
    throw new Error('categorie exist');
  }
  const categorie = await Categorie.create({ name, href });
  if (categorie) {
    res.status(201).json({
      message: 'categorie created',
    });
  } else {
    res.status(400);
    throw new Error('categorie data not store');
  }
});
//@ get
//@ categorie/getcat
//@ public
const getCategorie = asyncHandler(async (req, res) => {
  const categorie = await Categorie.find({});
  res.status(200).json(categorie);
});
export { createCategorie, getCategorie };
