const authenticateCheck = require('../../middlewares/authenticateCheck')

module.exports = (app, passport) => {
    app.get('/login', (req, res) => {
        res.send('<a href="/auth">Log In</a>')
    })
    app.get('/auth', passport.authenticate('github'))
    app.get('/auth/error', (req, res) => {
        res.send('Login Failed')
    })
    app.get('/auth/callback',
        passport.authenticate('github', {
            failureRedirect: '/auth/error',
            successRedirect: '/profile'})
    )
    app.get('/profile', authenticateCheck,
        (req, res) => {
            res.send(req.user.profile.id)
        }
    )
}
