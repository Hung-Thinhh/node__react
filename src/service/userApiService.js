import bcrypt from "bcryptjs";
import db from "../models/index";
import { checkUsername, checkPassword } from "./login-register";
// get the promise implementation, we will use bluebird
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0//", salt);

const hashPassword = (password) => {
  var pass_hash = bcrypt.hashSync(password, salt);
  return pass_hash;
};
const getAllUsers = async () => {
  try {
    let user = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex", "active"],
      include: [{ 
        model: db.Group,
        attributes: ["name", "description"]
      },
      {
        model: db.Danhgia, // thay db.danhgia bằng tên mô hình của bạn
        attributes: ["finaldanhgia", "danhgia"]
      }],
    });
    if (user) {
      return {
        EM: "get data sussess",
        EC: "0",
        DT: user,
      };
    } else {
      return {
        EM: "get data sussess",
        EC: "0",
        DT: [],
      };
    }
  } catch (error) {
    console.log("---- Error: " + error);
    return {
      EM: "something wrongs with services",
      EC: "1",
      DT: [],
    };
  }
};
const getUsersbyPagination = async (page, limit) => {
  let offset = (page - 1) * limit;
  try {
    const { count, rows } = await db.User.findAndCountAll({
      offset: +offset,
      limit: +limit,
      distinct: true,
      attributes: ["id", "username", "gender", "home", "birthday", "fullname","active"],
      include: [{ 
        model: db.Group,
        attributes: ["name", "description","id"]
      },
      {
        model: db.Danhgia, // thay db.danhgia bằng tên mô hình của bạn
        attributes: ["finaldanhgia", "danhgia"]
      }],
      order: [["id", "ASC"]],
    });
    let totalPages = Math.ceil(count / limit);
    let data = {
      totalPages: totalPages,
      totalRows: count,
      users: rows,
    };
    if (rows) {
      return {
        EM: "get data sussess",
        EC: "0",
        DT: data,
      };
    } 
  } catch (error) {
    console.log("---- Error: " + error);
    return {
      EM: "get data error",
      EC: "1",
      DT: [],
    };
  }
};
const createUsers = async (data) => {
  try {
    let isnameExist = await checkUsername(data.username);
    if (isnameExist) {
      return {
        EM: "the Username already exists",
        EC: "1",
        DT: "Username",
      };
    }
   

    let hashPass = hashPassword(data.password);
    await db.User.create({ ...data, password: hashPass });

    return {
      EM: "Create user successfully",
      EC: "0",
      DT: [],
    };
  } catch (error) {
    console.log("---- Error: " + error);
    return {
      EM: "something wrongs with services",
      EC: "1",
      DT: [],
    };
  }
};
const updateUsers = async (data) => {
  try {
    if (data.groupId == undefined || data.groupId == null) {
      return {
        EM: "Error with empty group",
        EC: "1",
        DT: "groupId",
      };
    }
    let user = await db.User.findOne({
      where: { id: data.id },
    });

    if (user) {
      console.log(data)
      await user.update({
        birthday: data.birthday,
        fullname: data.fullname,
        gender: data.gender,
        home: data.home,
        groupId: data.groupId,
        active: Number(data.active)
      });
      return {
        EM: "Update user sussess",
        EC: "0",
        DT: "",
      };
    } else {
      return {
        EM: "Error user update",
        EC: "0",
        DT: [],
      };
    }
  } catch (error) {
    console.log("---- Error: " + error);
    return {
      EM: "something wrongs with services",
      EC: "1",
      DT: [],
    };
  }
};
const deleteUsers = async (id) => {
  try {
    const user = await db.User.findOne({
      where: { id: id },
    });
    if (user) {
      await user.destroy();
      return {
        EM: "delete user sussess",
        EC: "0",
        DT: [],
      };
    } else {
      return {
        EM: "user not found",
        EC: "2",
        DT: [],
      };
    }
  } catch (error) {
    console.log("---- Error: " + error);
    return {
      EM: "something wrongs with services",
      EC: "1",
      DT: [],
    };
  }
};
const changePass = async (data, name) => {
  try {
    if (!name) {
      return {
        EM: "Error with empty group",
        EC: "1",
        DT: "groupId",
      };
    }
    let user = await db.User.findOne({
      where: { username: name },
    });

    if (user) {
      let isCorrectPassword = await checkPassword(data.oldpassword, user.password);
      console.log(user.password,data.password,isCorrectPassword)
      if (isCorrectPassword) {
       
        let hashPass = hashPassword(data.password);
        
        await user.update({
          password: hashPass,
        });
      } else {
        return {
          EM: "Update data error",
          EC: "1",
          DT: "Password incorrect",
        };
      }
      return {
        EM: "Update data sussess",
        EC: "0",
        DT: "",
      };
    } else {
      return {
        EM: "Error data update",
        EC: "0",
        DT: [],
      };
    }
  } catch (error) {
    console.log("---- Error: " + error);
    return {
      EM: "something wrongs with services",
      EC: "1",
      DT: [],
    };
  }
};
const getProfile = async (name) => {
  try {
    let user = await db.User.findOne({
      where: { username: name },
      attributes: ["id", "username", "fullname", "home", "gender", "avt", "birthday"],

    });
    if (user) {
      return {
        EM: "get data sussess",
        EC: "0",
        DT: user,
      };
    } else {
      return {
        EM: "get data sussess",
        EC: "0",
        DT: [],
      };
    }
  } catch (error) {
    console.log("---- Error: " + error);
    return {
      EM: "something wrongs with services",
      EC: "1",
      DT: [],
    };
  }
};
const editProfile = async (data, name) => {
  try {
    
    let user = await db.User.findOne({
      where: { username: name },
    });

    if (user) {
      console.log('haha'+JSON.stringify(data))
        let haha = await user.update({
          fullname: data.fullname,
          home: data.home,
          gender: data.gender,
          birthday: data.birthday,
          avt:data.avt
        });
      if (haha) {
        return {
          EM: "Update data sussess",
          EC: "0",
          DT: haha,
        };
      }
        return {
          EM: "Update data error",
          EC: "1",
          DT: "Password incorrect",
        };
      } else {
        return {
          EM: "Update data error",
          EC: "1",
          DT: "Password incorrect",
        };
      }
     
    
  } catch (error) {
    console.log("---- Error: " + error);
    return {
      EM: "something wrongs with services",
      EC: "1",
      DT: [],
    };
  }
};
module.exports = {
  getAllUsers,
  getUsersbyPagination,
  createUsers,
  updateUsers,
  deleteUsers,
  changePass,
  getProfile,
  editProfile
};
