import loginRegister from "../service/login-register";

const handleRegister = async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.phone ||
      !req.body.username ||
      !req.body.password
    ) {
      return res.status(200).json({
        EM: "missing required",
        EC: "1",
        DT: "",
      });
    }
    let data = await loginRegister.handleRegister(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    if (!req.body.valueLogin || !req.body.password) {
      return res.status(200).json({
        EM: "missing required",
        EC: "1",
        DT: "",
      });
    }
    console.log(req.body.valueLogin);
    let data = await loginRegister.handleLogin(req.body);
    if (data) {
      console.log(data);
      res.cookie("jwt", data.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (error) {
    console.log("error: >>>>", error);

    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const handleLogout = async (req, res) => {
    try {
      res.clearCookie('jwt');
    return res.status(200).json({
      EM: "clear cookies",
      EC: "0",
      DT: "",
    });
  } catch (error) {
    console.log("error: >>>>", error);

    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
};
