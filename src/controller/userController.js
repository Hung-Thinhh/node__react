import UserApiService from "../service/userApiService";
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "drupmc7qd",
  api_key: "725439635389318",
  api_secret: "c52-kr9-K0JKIQVNLQNZnSD5FRs",
});
const readFunc = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let data = await UserApiService.getUsersbyPagination(
        req.query.page,
        req.query.limit
      );
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } else {
      let data = await UserApiService.getAllUsers();
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
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
    let data = await UserApiService.createUsers(req.body);
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
    let data = await UserApiService.updateUsers(req.body);
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
    console.log(req.body.id);
    const data = await UserApiService.deleteUsers(req.body.id);
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
  console.log(req.user);
  return res.status(200).json({
    EM: "ok!",
    EC: "0",
    DT: {
      access_token: req.token,
      groupWithRole: req.user.groupWithRole,
      email: req.user.email,
      username: req.user.name,
    },
  });
};
const changePassUser = async (req, res) => {
  try {
    if (!req.body.oldpassword || !req.body.password) {
      return res.status(200).json({
        EM: "missing required",
        EC: "1",
        DT: "",
      });
    }
    console.log("hahaha" + JSON.stringify(req.user.password));
    let data = await UserApiService.changePass(req.body, req.user.name);

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
const profileUser = async (req, res) => {
  try {
    let data = await UserApiService.getProfile(req.user.name);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const upload = multer({
  storage: multer.memoryStorage(),
}).single("file");
const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    console.log(result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.log("Error uploading file:", error);
    throw error;
  }
};
const editprofileUser = async (req, res) => {
  console.log("jajjajaj");
  try {
    upload(req, res, async function (err) {
      let form;
      if (err) {
        // Xử lý lỗi khi tải lên
        console.log(err);
        return res.status(200).json({
          EM: "error from server",
          EC: "-1",
          DT: "",
        });
      } else if (!req.file) {
        form = {
          infor: {
            birthday: req.body.birthday,
            fullname: req.body.fullname,
            home: req.body.home,
            gender: req.body.gender,
          },
        };
      } else {
        const file = req.file;
        // Chuyển Buffer sang base64
        const fileBase64 = file.buffer.toString("base64");

        let imageUrl;

        try {
          imageUrl = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
              "data:image/png;base64," + fileBase64,
              function (error, result) {
                if (error) {
                  console.log("Error uploading file:", error);
                  reject(error);
                } else {
                  console.log("Uploaded file details:", result);
                  // Lấy URL an toàn của hình ảnh đã tải lên
                  const secureUrl = result.secure_url;

                  // Tiếp tục xử lý với URL hình ảnh
                  resolve(secureUrl);
                }
              }
            );
          });
        } catch (error) {
          // Xử lý lỗi nếu có
          console.log("Failed to upload image:", error);
        }
        console.log('hahaha'+imageUrl)
        form = {
          birthday: req.body.birthday,
          fullname: req.body.fullname,
          home: req.body.home,
          gender: req.body.gender,
          avt: imageUrl,
        };
      }
      // let data = await updateInfor(form, req.user.id);
      let data = await UserApiService.editProfile(form, req.user.name);

      console.log(req.body.email);
      if (data && data.EC == "0") {
        return res.status(200).json({
          EM: data.EM,
          EC: "0",
          DT: data.DT,
        });
      } else {
        return res.status(200).json({
          EM: "error from server",
          EC: "-1",
          DT: "",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
  accountUser,
  changePassUser,
  profileUser,
  editprofileUser,
};
