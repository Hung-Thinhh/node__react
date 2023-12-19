import bcrypt from "bcryptjs";
import db from "../models/index";
import { Op } from "sequelize";
// get the promise implementation, we will use bluebird
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0//", salt);

const hashPassword = (password) => {
  var pass_hash = bcrypt.hashSync(password, salt);
  return pass_hash;
};
const checkEmail = async (email) => {
  let user = await db.User.findOne({
    where: { email: email },
  });
  if (user) {
    return true;
  }
  return false;
};
const checkPhone = async (phone) => {
  let user = await db.User.findOne({
    where: { phone: phone },
  });
  if (user) {
    return true;
  }
  return false;
};
const handleRegister = async (data) => {
  try {
    let isEmailExist = await checkEmail(data.email);
    if (isEmailExist) {
      return {
        EM: "the Email already exists",
        EC: "1",
      };
    }
    let isPhoneExist = await checkPhone(data.email);
    if (isPhoneExist) {
      return {
        EM: "the phone number already exists",
        EC: "1",
      };
    }

    let hashPass = hashPassword(data.password);
    await db.User.create({
      email: data.email,
      phone: data.phone,
      username: data.username,
      password: hashPass,
    });
    return {
      EM: "A user created successfully",
      EC: "0",
    };
  } catch (error) {
    console.log("error: >>>>", error);
    return {
      EM: "error creating user",
      EC: "2",
    };
  }
};
const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
};
const handleLogin = async (data) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: data.valueLogin }, { phone: data.valueLogin }],
      },
    });
      if (user) {
        console.log("check user")
      let isCorrectPassword = await checkPassword(data.password, user.password);
          if (isCorrectPassword) {
          console.log("login is successfully")
        return {
          EM: "ok!",
          EC: "0",
        };
      }
    }

    console.log("Account is incorrect", data.valueLogin, data.password);
    return {
      EM: "Your email/phone or password is incorrect!",
      EC: "1",
    };
  } catch (error) {
    console.log("error: >>>>", error);
    return {
      EM: "error creating user",
      EC: "2",
    };
  }
};

module.exports = {
  handleRegister,
  handleLogin,
};
