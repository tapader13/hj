import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import genToken from '../token/genToken.js';
//@ post
//@ api/auth
//@ public
const createUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('user exist');
  }
  const user = await User.create({ email, password });
  if (user) {
    genToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('user data not store');
  }
});

//@ post
//@ api/login
//@ public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    genToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('user not found');
  }
});

//@ post
//@ api/logout
//@ public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    expires: new Date(0),
  });
  res.status(200).json('user logout');
});
export { createUser, loginUser, logoutUser };
