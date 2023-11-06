const handleHome = (req,res) => {
    return res.render('home.ejs')
}
const handleCreateUser = (req,res) => {
    return res.render('user.ejs')
}
const handleCreateNewUser = (req, res) => { 
    console.log('check',req)
    return res.send('handleCreateNewUser')
}

module.exports = {
    handleHome,
    handleCreateUser,
    handleCreateNewUser
}