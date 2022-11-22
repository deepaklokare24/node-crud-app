const User = require("../models/userModel");

exports.signUp = async (req, res) => {
  try {
    const newUser = await createUseObject(req);
    const savedUser = await User.create(newUser);
    console.log("Saved User: ", savedUser);
    return res.status(200).send({
      message: `User ${savedUser.firstName} ${savedUser.lastName} got created successfully!`,
      user: savedUser,
    });
  } catch (err) {
    return res
      .status(400)
      .send({ message: "Unable to save user!", error: err.message });
  }
};

exports.logIn = async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (!existingUser) {
    return res.status(404).send({ message: "User is not present!" });
  }
  return res.status(200).send({ message: "Found user", user: existingUser });
};

exports.updateUser = async (req, res) => {
  console.log(req.params);
  return res.status(200).send({
    message:
      "hitting the update user route with user id : " + req.params.userId,
  });
};

exports.deleteUser = async (req, res) => {
  console.log("reached here");
  return res.status(200).send({ message: "hitting the delete user route" });
};

exports.data = async (req, res) => {
  return res.status(200).send({ message: "hitting the data route" });
};

const createUseObject = async (req) => {
  console.log(req.body);
  const { firstName, lastName, email, phone, password } = req.body;

  return {
    firstName,
    lastName,
    email,
    phone,
    password,
  };
};
