import asyncHandler from 'express-async-handler';
import Contact from '../models/contactModel.js';
const createContact = asyncHandler(async (req, res) => {
  const { email, text } = req.body;
  const contact = await Contact.create({ email, text });
  if (contact) {
    res.status(201).json({
      _id: contact._id,
      email: contact.email,
    });
  } else {
    res.status(400);
    throw new Error('contact data not store');
  }
});
export { createContact };
