"use strict"

// Load .env file
require('dotenv').config()

// Express
const express           = require('express')
const app               = express()
const router            = require('./router')
const github            = require('./strategies/github')
const session           = require("express-session")
const sessionStore      = require('connect-redis')(session)
const sessionOptions    = require("./session")(sessionStore)
const protocol          = process.env.PROTOCOL = process.env.PROTOCOL || 'http'
const host              = process.env.HOST = process.env.HOST || 'localhost'
const port              = process.env.SERVER_PORT = process.env.SERVER_PORT || 5000

// Passport using github strategy
const passport = require('passport')

// Server dist folder as root /
app.use(express.static('dist'))

// Initialize session
app.use(session(sessionOptions))
app.use(passport.initialize())
app.use(passport.session())

// Add new strategy to the passport
passport.use(github.strategy(app, passport))

// Router
router.use(app)

// Listen for incoming requests
app.listen(port, () => {
    console.log(`Server started at ${protocol}://${host}:${port}`)
})