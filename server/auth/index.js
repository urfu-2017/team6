import passport from 'passport'
import GitHubStrategy from 'passport-github2'
import config from '../config'

passport.use(new GitHubStrategy.Strategy({
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: config.AUTH_CALLBACK
}, (accessToken, refreshToken, profile, callback) => callback(null, { accessToken, profile })))

passport.serializeUser((user, cb) => cb(null, user))
passport.deserializeUser((user, cb) => cb(null, user))

export default passport
