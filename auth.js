const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy

passport.use(new GitHubStrategy(
    {
        clientID: '011552492e39dcb9b1f4',
        clientSecret: '7c912a6f27ea1ac6d73732ba8ffd96df56c8552e',
        callbackURL: 'http://localhost:3000/auth/callback'
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log(`Acces token = ${accessToken}`)
        console.log(`refresh Token = ${refreshToken}`)
        console.log(`profile id = ${profile.id}`)

        return cb(null, {
            accessToken,
            profile
        })
    }
))

passport.serializeUser((user, cb) => {
    cb(null, user)
})

passport.deserializeUser((user, cb) => {
    cb(null, user)
})

module.exports = passport
