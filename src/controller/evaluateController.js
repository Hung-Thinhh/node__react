import evaluateService from "../service/evaluate-services";

const getEvaluate = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await evaluateService.getAllTieuchuan(id);
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
const get1Eval = async (req, res) => {
    try {
        let id = req.params.id;
      let data = await evaluateService.get1Tieuchuan(id);
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
const del1Eval = async (req, res) => {
    try {
      let data = await evaluateService.del1Tieuchuan(req.body.data);
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
const delTieuchuan = async (req, res) => {
  try {
    let data = await evaluateService.delTieuchuan(req.body.data);
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
const editTieuchi = async (req, res) => {
    try {
      let data = await evaluateService.updateTieuchi(req.body.data);
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
const editTieuchuan = async (req, res) => {
  try {
    let data = await evaluateService.updateTieuchuan(req.body.data);
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
const createTieuchi = async (req, res) => {
    try {
      let data = await evaluateService.CreTieuchi(req.body.data);
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
const createTieuchuan = async (req, res) => {
  try {
    let data = await evaluateService.CreTieuchuan(req.body.data);
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
const createVersion = async (req, res) => {
  if (!req.body.data && !req.body.data.version) {
    return res.status(200).json({
      EM: "Thông tin chưa đủ",
      EC: "-1",
      DT: "",
    });
  } else if (Number(req.body.data.diem) < 0) {
    return res.status(500).json({
      EM: "Điểm không phù hợp",
      EC: "-1",
      DT: "",
    });
  } else {
    try {
      let data = await evaluateService.createV(req.body.data);
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
};
const getDanhgia = async (req, res) => {
  try {
    let data = await evaluateService.getdanhgia(req.user.id);
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
const sendDanhgia = async (req, res) => {
  try {
    let data = await evaluateService.senddanhgia(req.user.id,req.body.data,req.body.data.version);
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
const sendDanhgiaforUser = async (req, res) => {
  try {
    let data = await evaluateService.senddanhgiaforUser(req.body.data.idUser,req.body.data.danhgia,req.body.data.version);
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
const sendReDanhgia = async (req, res) => {
  try {
    let data = await evaluateService.sendRedanhgia(req.body.data.idUser);
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
const getDanhgiaUser = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    let data = await evaluateService.getdanhgiaUser(id);
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
const getAllVersion = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await evaluateService.getallVersion(id);
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
const activeVersion = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await evaluateService.activeversion(id);
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
const unactiveVersion = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await evaluateService.unactiveversion(id);
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
const getChart = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await evaluateService.getchart(id);
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
module.exports = {
  getEvaluate, get1Eval, editTieuchi, del1Eval, createTieuchi, editTieuchuan,
  createTieuchuan, delTieuchuan, getDanhgia, sendDanhgia, getDanhgiaUser, sendDanhgiaforUser,
  getAllVersion,createVersion,sendReDanhgia,activeVersion,unactiveVersion,getChart
};
