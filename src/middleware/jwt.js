require("dotenv").config();
import jwt from "jsonwebtoken";

const createToken = (payload) => {
  let key = process.env.JWT_SECRET_KEY;
  let token = null;
  try {
    token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
  } catch (error) {
    console.log(error);
  }
  return token;
};
const verifyToken = (token) => {
  let key = process.env.JWT_SECRET_KEY;
  let decode = null;

  try {
    decode = jwt.verify(token, key);
  } catch (error) {
    console.log(error);
  }
  return decode;
};

const nonSecurePaths = ["/", "/register", "/login",'/logout'];
const adminSecurePaths = ["/evaluate/getDanhgiaUser", "/evaluate/sendDanhgiaforUser", "/evaluate/createTieuchuan", "/evaluate/createTieuchi",
  "/evaluate/editTieuchuan", "/evaluate/editTieuchi", "/evaluate/del1Eval","evaluate/sendReDanhgia", "/evaluate/del1tieuchuan/:id", "/evaluate/get1Eval/:id", "/evaluate/getEvaluate",
  "/user/delete","/user/update","/user/create","/user/read"
];

const extractToken = (req) => { 
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}
const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();

  let cookies = req.cookies;
  let tokenFromHeader = extractToken(req);
  if ((cookies && cookies.jwt) || tokenFromHeader) {
    let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        EC: "-1",
        DT: "",
        EM: "Not authenticated the user",
      });
    }
  } else {
    return res.status(401).json({
      EC: "-1",
      DT: "",
      EM: "Not authenticated the user",
    });
  }
};
const checkUserPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path) || req.path === "/account" && !adminSecurePaths.includes(req.path))
    return next();

  if (req.user) {
    let role = req.user.role;
    if (!role || role !== 0) {

      return res.status(200).json({
        EC: "-1",
        DT: "",
        EM: `You don't have permission to access this resource...`,
      });
    } else {
      
      next();
    }
  
  } else {
    return res.status(401).json({
      EC: "-1",
      DT: "",
      EM: "Not authenticated the user",
    });
  }
};
module.exports = {
  createToken,
  verifyToken,
  checkUserJWT,
  checkUserPermission,
};
