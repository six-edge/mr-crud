"use strict"

// Load .env file
require('dotenv').config()

const express           = require('express')
const app               = express()
const chalk             = require('chalk')
const router            = require('./router')
const github            = require('./strategies/github')
const session           = require('express-session')
const sessionStore      = require('connect-redis')(session)
const sessionOptions    = require('./session')(sessionStore)
const websocket         = require('ws')
const websocketHandler  = require('./websocket/handler')

const protocol  = process.env.PROTOCOL = process.env.PROTOCOL || 'http'
const host      = process.env.HOST = process.env.HOST || 'localhost'
const port      = process.env.PORT = process.env.PORT || 8000
const dev       = process.env.NODE_ENV !== 'production'
const env       = process.env.NODE_ENV

// Passport using github strategy
const passport = require('passport')

// Session parser for http and ws server
const sessionParser = session(sessionOptions)

// Initialize session
app.use(sessionParser)
app.use(passport.initialize())
app.use(passport.session())

// Add new strategy to the passport
passport.use(github.strategy(app, passport))

// Router has priority over static files
router.use(app)

// Server dist folder as static root
app.use(express.static('dist'))

// Listen for incoming requests
const server = app.listen(port, () => {
    console.info(`Server started at ${protocol}://${host}:${port}`)
})

// Create WebSocket Server
websocketHandler(new websocket.Server({
    server,
    verifyClient: (info, done) => {
        sessionParser(info.req, {}, () => {
            done(info.req.session)
        })
    }
}))

// Output environment
console.info(dev ? chalk.magenta(`Node Environment: ${env}`) : chalk.green(`Production Mode`))
