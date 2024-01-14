require("dotenv").config();
import bcrypt from "bcryptjs";
import db from "../models/index";
import { Op } from "sequelize";
import { getGroupWithRole } from "./jwt-services";
import { createToken } from "../middleware/jwt";
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
    let isPhoneExist = await checkPhone(data.phone);
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
      groupId: "4",
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
      console.log("hahah");
      let isCorrectPassword = await checkPassword(data.password, user.password);
      if (isCorrectPassword) {
        let groupWithRole = await getGroupWithRole(user);
        let payload = {
          email: user.email,
          groupWithRole,
          email: user.email,
          name: user.username
        };
        let token = createToken(payload);
        return {
          EM: "ok!",
          EC: "0",
          DT: {
            access_token: token,
            data: groupWithRole,
            email: user.email,
            name: user.username
          },
        };
      }
    } else {
      console.log("hahah");
      return {
        EM: "Your email/phone or password is incorrect!",
        EC: "2",
        DT: "",
      };
    }

    return {
      EM: "Your email/phone or password is incorrect!",
      EC: "1",
      DT: "",
    };
  } catch (error) {
    console.log("error: >>>>", error);
    return {
      EM: "error creating user",
      EC: "2",
      DT: "",
    };
  }
};

module.exports = {
  handleRegister,
  handleLogin,
  checkEmail,
  checkPhone,
};
