import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

// make hashed password
const makeHashedPassword = async (password, superSecretKey, saltNum) => {
  try {
    const combainKey = password + superSecretKey;
    const hashedPassword = await bcrypt.hash(combainKey, Number(saltNum));
    console.log(hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.log(`server error: ${error}`);
  }
};

//login function to compare the input Password with stored hashed password
const signIn = async (inputPassword, storedHashedPassword) => {
  try {
    //combine the input password with our secret key
    const combinedPassword = inputPassword + process.env.BCRYPT_KEY;

    //check if the combination of the two matches our stored password
    const isMatch = await bcrypt.compare(
      combinedPassword,
      storedHashedPassword
    );
    return isMatch;
  } catch (error) {
    console.log(`server error: ${error}`);
    return false;
  }
};

// creating jwt token
async function creatToken(userID, jwtKey, res) {
  const token = jwt.sign({ userID }, jwtKey, { expiresIn: "1h" });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure:false,
    maxAge: 60 * 60 * 1000,
    sameSite: "strict",
  });

  return token;
}

// const token = await creatToken("6725ef33079565d853d6c488", process.env.JWT_KEY);
// console.log(token);

export const auth = {
  makeHashedPassword,
  signIn,
  creatToken,
};
