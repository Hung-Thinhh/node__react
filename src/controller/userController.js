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
      role: req.user.role,
      email: req.user.email,
      username: req.user.name,
      active: req.user.active,
      thongbao: req.user.thongbao,
    },
  });
};
const changePassUser = async (req, res) => {
  try {
    if (!req.body.oldpassword || !req.body.password) {
      return res.status(200).json({
        EM: "Thông tin chưa đủ",
        EC: "1",
        DT: "",
      });
    } else {
      if (req.body.password.length > 6) {
        let data = await UserApiService.changePass(req.body, req.user.name);
        return res.status(200).json({
          EM: data.EM,
          EC: data.EC,
          DT: "",
        });
      } else {
        return res.status(200).json({
          EM: "Mật khẩu phải nhiều hơn 6 kí tự",
          EC: "1",
          DT: "",
        });
      }
    }

    
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
  const currentDate = new Date();
  const birthdayParts = req.body.birthday;
const birthdayDate = new Date(birthdayParts);

// So sánh ngày
  
  try {
    const currentDate = new Date();
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
            birthday: req.body.birthday,
            fullname: req.body.fullname,
            home: req.body.home,
            gender: req.body.gender,
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
          console.log("hahaha" + imageUrl);
          form = {
            birthday: req.body.birthday,
            fullname: req.body.fullname,
            home: req.body.home,
            gender: req.body.gender,
            avt: imageUrl,
          };
        }
        // let data = await updateInfor(form, req.user.id);
        console.log(form);
        if (currentDate >= new Date(form.birthday)) {
          
          let data = await UserApiService.editProfile(form, req.user.name);
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
        } else {
          return res.status(200).json({
            EM: "Ngày sinh chưa tồn tại",
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
