import db from "../models/index";

const createNewRoles = async (roles) => {
  try {
    let currentRoles = await db.Role.findAll({
      attrbutes: ["url", "description"],
      raw: true,
    });
    const persists = roles.filter(
      ({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2)
    );
    if (persists.length === 0) {
      return {
        EM: "Nothing to create",
        EC: "0",
        DT: [],
      };
    } else {
      await db.Role.bulkCreate(persists);
      return {
        EM: "create roles successfully",
        EC: "0",
        DT: [],
      };
    }
  } catch (error) {
    return {
      EM: "something wrongs with servies",
      EC: "1",
      DT: "",
    };
  }
};
const getAllRoles = async () => {
  try {
    let data = await db.Role.findAll({
      attributes: ["id", "url", "description"],
      order: [["id", "DESC"]],
    });
    return {
      EM: "Get roles successfully",
      EC: "0",
      DT: data,
    };
  } catch (error) {
    return {
      EM: "something wrongs with servies",
      EC: "1",
      DT: "",
    };
  }
};
const getRolebyGroup = async (id) => {
  try {
    if (id) {
      let data = await db.Group.findOne({
        where: { id: id },
        attributes : ['id','name','description'],
        include: {
            model: db.Role,
            attributes: ['id', 'url', 'description'],
            through:{attributes: []}
        }
      });
      return {
        EM: "Get roles by group successfully",
        EC: "0",
        DT: data,
      };
    } else {
      return {
        EM: "Get roles by group successfully",
        EC: "0",
        DT: [],
      };
    }
  } catch (error) {
    return {
      EM: "something wrongs with servies",
      EC: "1",
      DT: "",
    };
  }
};
const deleteRoles = async (id) => {
  try {
    let role = await db.Role.findOne({
      where: { id: id },
    });
    if (role) {
      await role.destroy();
      return {
        EM: "Delete roles successfully",
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
    return {
      EM: "something wrongs with servies",
      EC: "1",
      DT: "",
    };
  }
};
module.exports = {
  createNewRoles,
  getAllRoles,
  deleteRoles,
  getRolebyGroup,
};
