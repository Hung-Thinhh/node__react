import bcrypt from "bcryptjs";
import db from '../models/index';
// get the promise implementation, we will use bluebird
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0//", salt);

const hashPassword = (password) => {
  var pass_hash = bcrypt.hashSync(password, salt);
  return pass_hash;
};

const CreateNewUser = async (username, password, email) => {
  const pass_hash = hashPassword(password);
  try {
    await db.User.create({
      username: username,
      email: email,
      password: pass_hash
   })
  } catch (error) {
    console.log("---- Error: " + error);
  }
};
const EditUser = async (username, email, id) => {
  
  try {
    await db.User.update(
      {
        email: email,
        username: username,
      },
      {
      where: {
        id: id,
      }
    })
  } catch (error) {
    console.log("---- Error: " + error);
  }
};
const GetUser = async () => {
  
  try {
    let users = [];
    users = await db.User.findAll()
    return users
  } catch (error) {
    console.log("---- Error: " + error);
  }
};
const GetUserbyID = async (id) => {
  
  try {
    let user = {}
    user = await db.User.findOne({
      where: {
        id: id
      }
    })
    return user.get({plain:true})
  } catch (error) {
    console.log("---- Error: " + error);
  }
};
const DelUser = async (id) => {
 
  try {
    await db.User.destroy({
      where: {
        id: id,
      }
    })
    
  } catch (error) {
    console.log("---- Error: " + error);
  }
};

module.exports = {
  CreateNewUser,
  hashPassword,
  GetUser,
  DelUser,
  GetUserbyID,
  EditUser,
};
