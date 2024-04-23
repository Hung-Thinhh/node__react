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
const checkUsername = async (name) => {
  let user = await db.User.findOne({
    where: { username: name },
  });
  if (user) {
    return true;
  }
  return false;
};
const handleRegister = async (data) => {
  try {
    
    let checkname = await checkUsername(data.username);
    if (checkname) {
      return {
        EM: "the user name already exists",
        EC: "1",
      };
    }

    let hashPass = hashPassword(data.password);
    await db.User.create({
      username: data.username,
      password: hashPass,
      fullname: data.fullname,
      gender: data.gender,
      birthday: data.birthday,
      home: data.home,
      groupId: "1",
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
      where: { username: data.valueLogin },
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
  checkUsername,
  checkPassword
};
