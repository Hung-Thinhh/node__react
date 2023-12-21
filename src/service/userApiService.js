import bcrypt from "bcryptjs";
import db from "../models/index";
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
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });
    console.log(user);
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
        attributes: ["id", "username", "email", "phone", "sex"],
        include: { model: db.Group, attributes: ["name", "description"] },
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
    } else {
      return {
        EM: "get data sussess",
        EC: "0",
        DT: [],
      };
    }
  } catch (error) {
    console.log("---- Error: " + error);
  }
};
const createUsers = async () => {
  try {
    let user = await db.users.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
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
const updateUsers = async () => {
  try {
    let user = await db.users.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
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
const deleteUsers = async (id) => {
    try {
        const user = await db.User.findOne({
            where:{id:id}
        })
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

module.exports = {
  getAllUsers,
  getUsersbyPagination,
  createUsers,
  updateUsers,
  deleteUsers,
};
