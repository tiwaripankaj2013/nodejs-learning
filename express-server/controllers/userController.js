const User = require("./../models/user");

const userController = {};

userController.getAllUser = async (req, res) => {
  try {
    const respond = await User.find();
    res.json(respond);
  } catch (error) {
    console.log("error in fetch data");
    res.json(error);
  }
};

userController.create = async (req, res) => {
  try {
    const body = req.body;
    const newUser = new User(body);
    const result = await newUser.save();
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
};

userController.getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findOne({ _id: id });
    res.json({ message: result });
  } catch (error) {
    res.json({ message: error });
  }
};

userController.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const result = await User.findOneAndUpdate(id, body, { new: true });
    res.json({ message: result });
  } catch (error) {
    res.json({ message: error });
  }
};

userController.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findOneAndDelete(id, { new: true });
    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = userController;
