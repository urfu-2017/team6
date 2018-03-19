const express = require('express')
const passport = require('./auth')
const auth = require('./server/routes/auth')

const app = express()

app.use(require('cookie-parser')())
app.use(require('express-session')({ secret: 'f9u402bvcyafа4a2j8vuv', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

auth(app, passport)

app.listen(3000)
