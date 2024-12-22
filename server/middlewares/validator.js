import jwt from "jsonwebtoken";

const validateJoke = (req, res, next) => {
  if (!req.body.joke || !req.body.content) {
    return res.status(400).send({
      message: "Missing Fileds",
    });
  }
  next();
};

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1]; //authHeader &&

    if (!token) {
      return res.status(400).send({ message: "token miss!" });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({ massage: "invalid token", err });
      } else {
        req.userID = decoded.userID;
        console.log(decoded.userID);

        next();
      }
    });
  } catch (error) {
    res.status(500).send({ massage: "server error", error });
  }
};

export const validator = {
  validateJoke,
  verifyToken,
};
