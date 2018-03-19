module.exports = (req, res, next) => {
    if (req.user) {
        console.log(req.user.profile.id)
        next()
    }
    res.redirect('/login')
}
