import User from "../models/Users.js";

//update user
export const updateUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

//delete User
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

//get User
export const getUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//getAll Users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
