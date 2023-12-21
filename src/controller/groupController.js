import GroupApiService from '../service/groupApiService'; 


const readFunc = async (req, res) => {
    try {
       
           
            let data = await GroupApiService.getAllGroup();
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
module.exports = {
    readFunc
}