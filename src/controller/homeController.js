import userService from '../service/userService'

const handleHome = (req, res) => {
    return res.render('home.ejs')
}
const handleEdit = async (req, res) => {
    let userID ={}
    const user = await userService.GetUserbyID(req.params.id)
   
        console.log(req.params.id)
        userID = user
        return res.render('edit.ejs',{userID: userID})
    
}
const handleCreateUser = async(req, res) => {
    let userList = await userService.GetUser()
    return res.render('user.ejs',{userList: userList})
}
const handleCreateNewUser = async(req, res) => { 
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    await userService.CreateNewUser(username,password, email)
    return res.redirect("/user");   
}
const handleEditUser = async(req, res) => { 
    const username = req.body.username
    const email = req.body.email
    const id = req.body.id
    await userService.EditUser(username, email,id)
    return res.redirect("/user");   
}
const handleDeleteUser = async (req, res) => {
    console.log('check', req.params.id)
    await userService.DelUser(req.params.id)
    return res.redirect("/user");   

}

module.exports = {
    handleHome,
    handleCreateUser,
    handleCreateNewUser,
    handleDeleteUser,
    handleEdit,
    handleEditUser
}