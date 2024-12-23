import User from "../models/usersModel.js";
import { auth } from "../auth/auth.js";

//  get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};

// get user by id
async function getUsereById(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user === null) {
      return res.status(404).json({ massege: "id not found" });
    }
    res.send({ user });
  } catch (error) {
    return res.status(500).json({ massege: error.massege });
  }
  res.user = user;
  next();
}

// get random users by num of users
const getRandomeUsers = async (req, res) => {
  try {
    let num = req.params.num || 1;

    if (isNaN(num) || num < 1) {
      num = 1;
    }

    const randomUsers = await User.aggregate([
      { $sample: { size: parseInt(num) } },
    ]);

    randomUsers.forEach((object) => delete object.password);

    res.send(randomUsers);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};

//   add user
const addUser = async (req, res) => {
  try {
    const hashedPassword = await auth.makeHashedPassword(
      req.body.password,
      process.env.BCRYPT_KEY,
      process.env.SALT_NUM
    );

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      country: req.body.country,
      phone: req.body.phone,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    const id = savedUser._id;
    res.send({
      message: "seve this id to delete or update the user latter on",
      id,
    });
  } catch (error) {
    // check if it mongoose error
    if (error.name === "ValidationError") {
      return res.status(400).send({
        message: "Validation error occurred.",
        error: error.message,
      });
    } else if (error.code === 11000) {
      return res.status(409).send({
        message: "Duplicate key error. This user already exists.",
        error: error.message,
      });
    } else {
      console.error(error);
      return res.status(500).send({ error });
    }
  }
};

// sign in
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password) {
      console.log("pass");
      return res
        .status(400)
        .send({ isValid: false, massege: "password require" });
    }

    const user = await User.find({ email }).select("+password");
    // console.log(user);

    const hashedPassword = user[0].password;
    // console.log(hashedPassword);

    const isMatch = await auth.signIn(password, hashedPassword);
    console.log(isMatch);

    if (isMatch === false) {
      return res
        .status(401)
        .send({ isValid: false, message: "Wrong password" });
    }
    console.log(isMatch);

    const id = user[0].id;

    const token = await auth.creatToken(id, process.env.JWT_KEY, res);

    res.cookie("jwt", token, {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000 * 12,
    });

    res.status(200).send({ isValid: true, message: "Login successfuly", id });
  } catch (error) {
    console.log(error);

    return res.status(500).send({ error });
  }
};

//   update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, country, phone, email, password } = req.body;
    const filedsToUpdate = {};

    if (firstName || firstName !== "") {
      filedsToUpdate.firstName = firstName;
    }

    if (lastName || lastName !== "") {
      filedsToUpdate.lastName = lastName;
    }

    if (country || country !== "") {
      filedsToUpdate.country = country;
    }

    if (phone || phone !== "") {
      filedsToUpdate.phone = phone;
    }

    if (email || email !== "") {
      filedsToUpdate.email = email;
    }

    if (password || password !== "") {
      const hashedPassword = await auth.makeHashedPassword(
        password,
        process.env.BCRYPT_KEY,
        process.env.SALT_NUM
      );
      filedsToUpdate.password = hashedPassword;
    }

    await User.findByIdAndUpdate(id, filedsToUpdate, {
      runValidators: true,
    });
    res.send({ message: "updated successfully", userId: req.userID });
  } catch (err) {
    res.send({ error: `${err}` });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).send({ message: "user not found" });
    }

    res.send({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const userController = {
  getAllUsers,
  addUser,
  getUsereById,
  getRandomeUsers,
  updateUser,
  deleteUser,
  signIn,
};
