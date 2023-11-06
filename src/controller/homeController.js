const handleHome = (req,res) => {
    return res.render('home.ejs')
}
const handleCreateUser = (req,res) => {
    return res.render('user.ejs')
}

module.exports = {
    handleHome,
    handleCreateUser
}