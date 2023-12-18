import userService from '../service/userService'
import loginRegister from '../service/login-register'

const handleRegister = async(req, res) => {
    console.log('call me', req.body)
    try {
        if (!req.body.email || !req.body.phone || !req.body.username || !req.body.password) {
            return res.status(200).json({
                EM: 'missing required',
                EC: '1',
                DT: ''
            })
        }
        let data = await loginRegister.handleRegister(req.body)
        
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: ''
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}


module.exports = {
    handleRegister
}