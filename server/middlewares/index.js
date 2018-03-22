import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import generateToken from 'random-token'
import authMiddleware from './authMiddleware'
import passport from '../auth'

export default app => app
    .use(cookieParser())
    .use(expressSession({
        secret: generateToken(16),
        resave: true,
        saveUninitialized: true
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(authMiddleware)
