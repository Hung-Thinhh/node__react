import userService from '../service/userService'

const handleHome = (req, res) => {
    return res.render('home.ejs')
}
const handleCreateUser = (req,res) => {
    return res.render('user.ejs')
}
const handleCreateNewUser = (req, res) => { 
    console.log('check', req.body.email)
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
   
    userService.CreateNewUser(username,password, email)

    
   
    return res.send('handleCreateNewUser')
    
      
}

module.exports = {
    handleHome,
    handleCreateUser,
    handleCreateNewUser
}