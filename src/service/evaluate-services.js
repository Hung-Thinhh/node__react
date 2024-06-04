import db from "../models/index";

const getAllTieuchuan = async (id) => {
  let group = await db.Tieuchuan.findAll({
    attributes: ["id", "name", "diem"],
    where: { versionID: id },
  });
  let version = await db.Version.findOne({
    where: { id: id },
  });

  if (group) {
    return {
      EM: "get data group sussess",
      EC: "0",
      DT: { tieuchuan: group, version: version },
    };
  } else {
    return {
      EM: "get data group sussess",
      EC: "0",
      DT: [],
    };
  }
};
const get1Tieuchuan = async (id) => {
  const tieuchuan = await db.Tieuchuan.findByPk(id);
  // if (!tieuchuan) {
  //   throw new Error("Không tìm thấy tiêu chuẩn");
  // }
  const tieuchi = await db.Tieuchuan_tieuchi.findAll({
    where: {
      id_tieuchuan: id,
    },
    include: [
      {
        model: db.Tieuchi,
      },
    ],
  });

  if (tieuchuan && tieuchi) {
    return {
      EM: "get data group sussess",
      EC: "0",
      DT: { tieuchuan, tieuchi },
    };
  } else {
    return {
      EM: "get data group sussess",
      EC: "0",
      DT: [],
    };
  }
};
const del1Tieuchuan = async (data) => {
  const version = await db.Version.findOne({ where: { status: "0" } });

  const danhgia = await db.Danhgia.findOne({
    where: { versionId: version.id },
  });
  if (!danhgia || danhgia.finaldanhgia == null) {
    const tieuchi = await db.Tieuchi.findByPk(data.id);
    const tieuchiof = await db.Tieuchuan_tieuchi.findOne({
      where: {
        id_tieuchuan: data.id_tieuchuan,
        id_tieuchi: data.id,
      },
      include: [
        {
          model: db.Tieuchi,
        },
      ],
    });
    if (tieuchi || tieuchiof) {
      await tieuchi.destroy();
      await tieuchiof.destroy();
      return {
        EM: "get data group sussess",
        EC: "0",
        DT: "",
      };
    } else {
      console.log(`Không tìm thấy tiêu chí có id ${id}`);
      return {
        EM: "get data group sussess",
        EC: "-1",
        DT: [],
      };
    }
  } else {
    return {
      EM: "Bảng đánh giá hiện không thể sửa",
      EC: "1",
      DT: [],
    };
  }
};
const delTieuchuan = async (data) => {
  const version = await db.Version.findOne({
    where: { status: "0", id: data.version },
  });
  console.log(version);
  const danhgia = version
    ? await db.Danhgia.findOne({ where: { versionId: version.id } })
    : null;
  if (!danhgia || danhgia.finaldanhgia == null) {
    const tieuchuan = await db.Tieuchuan.findByPk(data.id);
    const tieuchiof = await db.Tieuchuan_tieuchi.findAll({
      where: {
        id_tieuchuan: data.id,
      },
    });
    console.log("um", tieuchiof);
    for (const item of tieuchiof) {
      let tieuchuan = await db.Tieuchi.findByPk(item.id_tieuchi);
      console.log("haha", tieuchuan);
      await tieuchuan.destroy();
    }
    const tieuchi = await db.Tieuchuan_tieuchi.destroy({
      where: {
        id_tieuchuan: data.id,
      },
    });
    if (tieuchuan) {
      await tieuchuan.destroy();
      return {
        EM: "get data group sussess",
        EC: "0",
        DT: "",
      };
    } else {
      console.log(`Không tìm thấy tiêu chí có id ${data.id}`);
      return {
        EM: "get data group sussess",
        EC: "-1",
        DT: [],
      };
    }
  } else {
    return {
      EM: "Bảng đánh giá hiện không thể sửa",
      EC: "1",
      DT: [],
    };
  }
};
const updateTieuchi = async (data) => {
  if (Number(data.tieuchiData.diem) >= 0) {
    try {
      const tieuchuan = await db.Tieuchuan.findOne({
        where: { id: data.listTieuchiData[0].id_tieuchuan },
      });
      const version = await db.Version.findOne({
        where: { status: "0", id: tieuchuan.versionId },
      });
      const danhgia = version
        ? await db.Danhgia.findOne({ where: { versionId: version.id } })
        : null;
      if (!danhgia || danhgia.finaldanhgia == null) {

        const listTieuchi = await db.Tieuchuan_tieuchi.findAll({
          where: {
            versionId: version.id,
          },
        });

        let Tongdiem = 0;
        let name = false;
        if (listTieuchi.length > 0) {
          for (const item of listTieuchi) {
            let tieuchuan = await db.Tieuchi.findByPk(item.id_tieuchi);
            Tongdiem = Tongdiem + Number(tieuchuan.diem);
            if (
              tieuchuan.name == data.tieuchiData.name &&
              tieuchuan.id != data.tieuchiData.id
            ) {
              name = true;
            }
          }
        }
      
        if (
          Tongdiem + Number(data.tieuchiData.diem) <= version.total_diem &&
          !name
        ) {
          await db.Tieuchi.update(
            { name: data.tieuchiData.name, diem: data.tieuchiData.diem },
            {
              where: { id: data.tieuchiData.id },
            }
          );
          // Tiếp tục với mã cập nhật dữ liệu...
          const listUser = await db.Danhgia.findAll({
            where: {
            versionId: version.id
            }
          })
          console.log(listUser);
          for (const item of listUser) {
            let tieuchuan = await db.User.findByPk(item.userId);
            console.log('lalalalallaal',tieuchuan);
            await tieuchuan.update(
              {
          
                thongbao: "1",
              },
              {
                where: {}
              }
            );
          }
          
         
          return {
            EM: "get data group sussess",
            EC: "0",
            DT: "",
          };
        } else {
          return {
            EM: "Tổng điểm các tiêu chi phải bằng điểm tổng của tiêu chuẩn",
            EC: "1",
            DT: [],
          };
        }
      } else {
        return {
          EM: "Bảng đánh giá hiện không thể sửa",
          EC: "1",
          DT: [],
        };
      }
    } catch (error) {
      console.log("Lỗi khi cập nhật dữ liệu:", error);
      return {
        EM: "get data group sussess",
        EC: "1",
        DT: [],
      };
    }
  } else {
    return {
      EM: "Điểm không phù hợp",
      EC: "-1",
      DT: [],
    };
  }
};
const updateTieuchuan = async (data) => {
  try {
    const version = await db.Version.findOne({
      where: { status: "0", id: data.version },
    });
    console.log(version);
    const danhgia = version
      ? await db.Danhgia.findOne({ where: { versionId: version.id } })
      : null;
    if (!danhgia || danhgia.finaldanhgia == null) {
      console.log("tieuchiData", data);
      await db.Tieuchuan.update(
        { name: data.name },
        {
          where: { id: data.id, versionId: data.version },
        }
      );

      return {
        EM: "get data group sussess",
        EC: "0",
        DT: "",
      };
    } else {
      return {
        EM: "Bảng đánh giá hiện không thể sửa",
        EC: "1",
        DT: [],
      };
    }
  } catch (error) {
    console.log("Lỗi khi cập nhật dữ liệu:", error);
    return {
      EM: "get data group sussess",
      EC: "1",
      DT: [],
    };
  }
};
const CreTieuchi = async (data) => {
  if (Number(data.tieuchuanNew.diem) >= 0) {
    const version = await db.Version.findOne({
      where: { status: "0", id: data.version },
    });
    console.log(version);
    const danhgia = version
      ? await db.Danhgia.findOne({ where: { versionId: version.id } })
      : null;
    if (!danhgia || danhgia.finaldanhgia == null) {
      console.log(data);
      const listTieuchi = await db.Tieuchuan_tieuchi.findAll({
        where: {
          versionId: data.tieuchuanNew.version,
        },
      });

      let Tongdiem = 0;
      let name = false;
      if (listTieuchi.length > 0) {
        for (const item of listTieuchi) {
          let tieuchuan = await db.Tieuchi.findByPk(item.id_tieuchi);
          Tongdiem = Tongdiem + Number(tieuchuan.diem);
          if (tieuchuan.name == data.tieuchuanNew.name) {
            name = true;
          }
        }
      }
      console.log(Tongdiem + Number(data.tieuchuanNew.diem));
      if (
        Tongdiem + Number(data.tieuchuanNew.diem) <= version.total_diem &&
        !name
      ) {
        const tieuchi = db.Tieuchi.build({
          name: data.tieuchuanNew.name,
          diem: data.tieuchuanNew.diem,
        });
        await tieuchi.save();
        const tieuchiof = db.Tieuchuan_tieuchi.build({
          id_tieuchuan: data.tieuchuanNew.id_tieuchuan,
          id_tieuchi: tieuchi.id,
          versionId: data.tieuchuanNew.version,
        });
        await tieuchiof.save();
        if (tieuchi) {
          return {
            EM: "get data group sussess",
            EC: "0",
            DT: "",
          };
        } else {
          console.log(`Không tìm thấy tiêu chí có id ${id}`);
          return {
            EM: "get data group sussess",
            EC: "-1",
            DT: [],
          };
        }
      } else {
        return {
          EM: "Điểm hoặc tên chưa phù hợp",
          EC: "-1",
          DT: [],
        };
      }
    } else {
      return {
        EM: "Bảng đánh giá hiện không thể sửa",
        EC: "1",
        DT: [],
      };
    }
  } else {
    return {
      EM: "Số điểm không được âm",
      EC: "-1",
      DT: [],
    };
  }
};
const CreTieuchuan = async (data) => {
  const version = await db.Version.findOne({
    where: { status: "0", id: data.version },
  });
  console.log(version);
  const danhgia = version
    ? await db.Danhgia.findOne({ where: { versionId: version.id } })
    : null;
  if (!danhgia || danhgia.finaldanhgia == null) {
    const TieuchuanName = await db.Tieuchuan.findOne({
      where: {
        name: data.name,
        versionId: data.version,
      },
    });
    if (TieuchuanName) {
      return {
        EM: "tên tiêu chuẩn đã tồn tại",
        EC: "-1",
        DT: [],
      };
    } else {
      const listTieuchi = await db.Tieuchuan_tieuchi.findAll({
        where: {
          versionId: data.version,
        },
      });
      const version = await db.Version.findOne({
        id: data.version,
      });
      let Tongdiem = 0;
      if (listTieuchi.length > 0) {
        for (const item of listTieuchi) {
          let tieuchuan = await db.Tieuchi.findByPk(item.id_tieuchi);
          Tongdiem = Tongdiem + Number(tieuchuan.diem);
        }
      }
      console.log(Tongdiem);
      if (Tongdiem != version.total_diem) {
        const tieuchi = db.Tieuchuan.build({
          name: data.name,
          diem: data.diem,
          versionId: data.version,
        });
        await tieuchi.save();
        if (tieuchi) {
          return {
            EM: "get data group sussess",
            EC: "0",
            DT: "",
          };
        } else {
          console.log(`Không tìm thấy tiêu chí có id`);
          return {
            EM: "get data group sussess",
            EC: "-1",
            DT: [],
          };
        }
      } else {
        return {
          EM: "Không thể thêm tiêu chuẩn vì đã đủ điểm",
          EC: "-1",
          DT: [],
        };
      }
    }
  } else {
    return {
      EM: "Bảng đánh giá hiện không thể sửa",
      EC: "1",
      DT: [],
    };
  }
};
const createV = async (data) => {
  if (Number(data.diem) >= 0) {
    let check = false;
    const listTieuchuan = await db.Version.findOne({
      where: { name: data.name },
    });
    if (!listTieuchuan) {
      console.log(data);
      const tieuchi = db.Version.build({
        name: data.name,
        total_diem: data.diem,
        status: "1",
      });
      await tieuchi.save();
      if (tieuchi) {
        return {
          EM: "sussess",
          EC: "0",
          DT: "",
        };
      } else {
        console.log(`Không tạo được`);
        return {
          EM: "get data group sussess",
          EC: "-1",
          DT: [],
        };
      }
    } else {
      return {
        EM: "Tên đánh giá đã tồn tại",
        EC: "-1",
        DT: [],
      };
    }
  } else {
    return {
      EM: "Điểm không được âm",
      EC: "-1",
      DT: [],
    };
  }
};
const getdanhgia = async (id) => {
  try {
    const danhgia = await db.Danhgia.findOne({ where: { userId: id } });
    const version = await db.Version.findOne({ where: { status: "0" } });
    const listTieuchuan = await db.Tieuchuan.findAll({
      where: { versionId: version.id },
    });
    const listTieuchuan2 = [];
    for (const item of listTieuchuan) {
      const tieuchiof = await db.Tieuchuan_tieuchi.findAll({
        where: {
          id_tieuchuan: `${item.id}`,
        },
        include: [
          {
            model: db.Tieuchi,
          },
        ],
      });
      console.log(item.id);
      listTieuchuan2.push(tieuchiof);
    }
    // console.log({listTieuchuan,listTieuchuan2})
    return {
      EM: "get data group sussess",
      EC: "0",
      DT: { listTieuchuan, listTieuchuan2, danhgia, version: version.id },
    };
  } catch (error) {
    console.log("Lỗi khi cập nhật dữ liệu:", error);
    return {
      EM: "get data group sussess",
      EC: "1",
      DT: [],
    };
  }
};
const senddanhgia = async (id, data, version) => {
  try {
    const danhgia = await db.Danhgia.findOne({ where: { userId: id } });
    console.log(version);
    if (danhgia) {
      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
      const user = await db.User.findOne({ where: { userId: id } });
      const tieuchi = {};
      if (user && user.thongbao != "") {
        tieuchi = db.User.update(
          {
            danhgia: data,
            versionId: version,
          },
          {
            where: {
              userId: id,
            },
          }
        );
      } else {
        tieuchi = db.User.update(
          {
            danhgia: data,
            versionId: version,
            thongbao: "",
          },
          {
            where: {
              userId: id,
            },
          }
        );
      }
      if (tieuchi) {
        return {
          EM: "get data group sussess",
          EC: "0",
          DT: "",
        };
      } else {
        return {
          EM: "get data group sussess",
          EC: "1",
          DT: [],
        };
      }
    } else {
      console.log("llllllllllllllllllllllllllllllllllllllllllllllllllllllll");
      const tieuchi = db.Danhgia.build({
        userId: id,
        danhgia: data,
        finaldanhgia: null,
        versionId: version,
      });
      await tieuchi.save();
      if (tieuchi) {
        return {
          EM: "Đánh giá thành công",
          EC: "0",
          DT: "",
        };
      } else {
        return {
          EM: "Đánh giá thất bại",
          EC: "1",
          DT: [],
        };
      }
    }
  } catch (error) {
    console.log("Lỗi khi cập nhật dữ liệu:", error);
    return {
      EM: "get data group sussess",
      EC: "1",
      DT: [],
    };
  }
};
const senddanhgiaforUser = async (id, data, version) => {
  try {
    console.log("shjkgdhjasgdhjsagdhjasgdhjasgdhaj", id);

    const admin = await db.Danhgia.findOne({
      where: {
        userId: id,
      },
    });
    if (admin) {
      console.log("llllllllllllllllllllllllll");
      const tieuchi = db.Danhgia.update(
        {
          finaldanhgia: data,
          versionId: version,
        },
        {
          where: {
            userId: id,
          },
        }
      );

      if (tieuchi) {
        return {
          EM: "get data group sussess",
          EC: "0",
          DT: "",
        };
      } else {
        return {
          EM: "get data group sussess",
          EC: "1",
          DT: [],
        };
      }
    } else {
      {
        console.log("jjjjjjjjjjjjjjjjjjjjjjj");
        const tieuchi = db.Danhgia.build({
          userId: id,
          danhgia: null,
          finaldanhgia: data,
        });
        await tieuchi.save();
        if (tieuchi) {
          return {
            EM: "Đánh giá thành công",
            EC: "0",
            DT: "",
          };
        } else {
          return {
            EM: "Đánh giá thất bại",
            EC: "1",
            DT: [],
          };
        }
      }
    }
  } catch (error) {
    console.log("Lỗi khi cập nhật dữ liệu:", error);
    return {
      EM: "get data group sussess",
      EC: "1",
      DT: [],
    };
  }
};
const sendRedanhgia = async (id, data) => {
  try {
    const admin = await db.Danhgia.findOne({
      where: {
        userId: id,
      },
    });
    if (admin) {
      console.log("llllllllllllllllllllllllll");
      const tieuchi = db.User.update(
        { thongbao: "1" },
        {
          where: {
            id: id,
          },
        }
      );

      if (tieuchi) {
        return {
          EM: "get data group sussess",
          EC: "0",
          DT: "",
        };
      } else {
        return {
          EM: "get data group sussess",
          EC: "1",
          DT: [],
        };
      }
    }
  } catch (error) {
    console.log("Lỗi khi cập nhật dữ liệu:", error);
    return {
      EM: "get data group sussess",
      EC: "1",
      DT: [],
    };
  }
};
const getdanhgiaUser = async (id) => {
  try {
    console.log("ạkhsdkjahdkjahdkjahdkjahj", id);
    const version = await db.Version.findOne({ where: { status: "0" } });
    console.log("ver", version.id);

    const tieuchi = await db.Danhgia.findOne({
      where: {
        userId: id,
        versionId: version.id,
      },
    });
    console.log(tieuchi);
    const listTieuchuan = await db.Tieuchuan.findAll({
      where: { versionId: version.id },
    });
    const listTieuchuan2 = [];
    for (const item of listTieuchuan) {
      const tieuchiof = await db.Tieuchuan_tieuchi.findAll({
        where: {
          id_tieuchuan: `${item.id}`,
        },
        include: [
          {
            model: db.Tieuchi,
          },
        ],
      });
      console.log(item.id);
      listTieuchuan2.push(tieuchiof);
    }
    if (tieuchi) {
      return {
        EM: "get data group sussess",
        EC: "0",
        DT: {
          danhgia: tieuchi,
          listTieuchuan,
          listTieuchuan2,
          version: version.id,
        },
      };
    } else {
      return {
        EM: "get data group sussess",
        EC: "1",
        DT: { listTieuchuan, listTieuchuan2, version: version.id },
      };
    }
  } catch (error) {
    console.log("Lỗi khi cập nhật dữ liệu:", error);
    return {
      EM: "get data group sussess",
      EC: "1",
      DT: [],
    };
  }
};
const getallVersion = async (id) => {
  try {
    const version = await db.Version.findAll();
    if (version) {
      return {
        EM: "get data group sussess",
        EC: "0",
        DT: version,
      };
    } else {
      return {
        EM: "No version found",
        EC: "1",
        DT: [],
      };
    }

    // console.log({listTieuchuan,listTieuchuan2})
  } catch (error) {
    console.log("Lỗi khi cập nhật dữ liệu:", error);
    return {
      EM: "get data group sussess",
      EC: "1",
      DT: [],
    };
  }
};
const activeversion = async (id) => {
  try {
    const version = await db.Version.findOne({ where: { id: id } });
    await db.Version.update({ status: "1" }, { where: {} });
    await db.Version.update(
      { status: "0" },
      {
        where: { id: id },
      }
    );
    if (version) {
      return {
        EM: "get data group sussess",
        EC: "0",
        DT: version,
      };
    } else {
      return {
        EM: "No version found",
        EC: "1",
        DT: [],
      };
    }

    // console.log({listTieuchuan,listTieuchuan2})
  } catch (error) {
    console.log("Lỗi khi cập nhật dữ liệu:", error);
    return {
      EM: "get data group sussess",
      EC: "1",
      DT: [],
    };
  }
};
const unactiveversion = async (id) => {
  try {
    const version = await db.Version.findOne({ where: { id: id } });

    await db.Version.update(
      { status: "1" },
      {
        where: { id: id },
      }
    );
    if (version) {
      return {
        EM: "get data group sussess",
        EC: "0",
        DT: version,
      };
    } else {
      return {
        EM: "No version found",
        EC: "1",
        DT: [],
      };
    }

    // console.log({listTieuchuan,listTieuchuan2})
  } catch (error) {
    console.log("Lỗi khi cập nhật dữ liệu:", error);
    return {
      EM: "get data group sussess",
      EC: "1",
      DT: [],
    };
  }
};
const getchart = async () => {
  try {
    const version = await db.Version.findOne({ where: { status:'0'} });
    let noEva = 0
    let Evaed = 0;
    let Eva = 0
    const user = await db.User.findAll()
    for (const item of user) {
      let danhgia = await db.Danhgia.findOne({ where: { userId: item.id,versionId:version.id } });
      console.log(danhgia);
      if (danhgia && danhgia.finaldanhgia) {
        if (Number(danhgia.finaldanhgia) >= 60) {
          Evaed += 1
          console.log('ahhaah');
        } else {
          Eva += 1
          console.log('ahhaah');
          
        }
      }
    }
    console.log('ahhaah');

    noEva = user.length - Evaed - Eva;
   
      return {
        EM: "get data group sussess",
        EC: "0",
        DT: { noEva,Eva,Evaed},
      };
    

    // console.log({listTieuchuan,listTieuchuan2})
  } catch (error) {
    console.log("Lỗi khi cập nhật dữ liệu:", error);
    return {
      EM: "get data group sussess",
      EC: "1",
      DT: [],
    };
  }
};
module.exports = {
  getAllTieuchuan,
  get1Tieuchuan,
  updateTieuchi,
  del1Tieuchuan,
  CreTieuchi,
  updateTieuchuan,
  CreTieuchuan,
  delTieuchuan,
  getdanhgia,
  senddanhgia,
  getdanhgiaUser,
  senddanhgiaforUser,
  getallVersion,
  createV,
  sendRedanhgia,
  activeversion,
  unactiveversion,getchart
};
