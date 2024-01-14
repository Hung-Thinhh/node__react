import UserApiService from '../service/userApiService'; 

const readFunc = async(req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let data = await UserApiService.getUsersbyPagination(req.query.page, req.query.limit);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
        } else {
            let data = await UserApiService.getAllUsers()
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}
const createFunc = async(req, res) => {
    try {
        let data = await UserApiService.createUsers(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}
const updateFunc = async(req, res) => {
    try {
        let data = await UserApiService.updateUsers(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}
const deleteFunc = async(req, res) => {
    try {
        console.log(req.body.id)
        const data = await UserApiService.deleteUsers(req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}
const accountUser = (req, res) => { 
    return res.status(200).json({
        EM: "ok!",
          EC: "0",
          DT: {
            access_token: req.token,
            groupWithRole:req.user.groupWithRole,
            email: req.user.email,
            username: req.user.username
          },
    })
}
module.exports = {
    readFunc,
    createFunc,
    updateFunc,
    deleteFunc,
    accountUser
}