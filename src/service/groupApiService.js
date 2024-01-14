import db from "../models/index";

const getAllGroup = async() => {
    let group = await db.Group.findAll({
        order: [
            ['name','ASC']
        ]
    });
      if (group) {
        return {
          EM: "get data group sussess",
          EC: "0",
          DT: group,
        };
      } else {
        return {
          EM: "get data group sussess",
          EC: "0",
          DT: [],
        };
      }
}

module.exports = {
    getAllGroup
}