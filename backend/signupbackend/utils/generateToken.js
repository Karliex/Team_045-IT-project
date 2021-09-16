import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, "jwt", {
    expiresIn: 60*60*6,
  });
};

export default generateToken;
