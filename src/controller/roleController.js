import RoleApiService from "../service/roleApiService";

const readFunc = async (req, res) => {
  try {
      let data = await RoleApiService.getAllRoles();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const readRolebyGroup = async (req, res) => {
    try {
      let id = req.params.id;

        let data = await RoleApiService.getRolebyGroup(id);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        EM: "error from server",
        EC: "-1",
        DT: "",
      });
    }
  };
const createFunc = async (req, res) => {
  try {
    let data = await RoleApiService.createNewRoles(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const updateFunc = async (req, res) => {
    try {
    let data = await RoleApiService.updateUsers(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const deleteFunc = async (req, res) => {
    try {
      console.log('hahah');
    const data = await RoleApiService.deleteRoles(req.body.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const accountUser = (req, res) => {
  console.log('ighjyhghugyuig',req.user)
  return res.status(200).json({
    EM: "ok!",
    EC: "0",
    DT: {
      access_token: req.token,
      email: req.user.email,
      username: req.user.name,
      active: req.user.active,
    },
  });
};
const assignRoleToGroup = async(req, res) => {
  try {
  const data = await RoleApiService.assignRoleToGroup(req.body.data);
  return res.status(200).json({
    EM: data.EM,
    EC: data.EC,
    DT: data.DT,
  });
} catch (error) {
  console.log(error);
  return res.status(500).json({
    EM: "error from server",
    EC: "-1",
    DT: "",
  });
}
}
module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
    accountUser,
  readRolebyGroup,
  assignRoleToGroup
};
