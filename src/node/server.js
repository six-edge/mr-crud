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
const port      = process.env.HTTP_PORT = process.env.HTTP_PORT || 5000
const wsPort    = process.env.WS_PORT = process.env.WS_PORT || 5050
const dev       = process.env.NODE_ENV !== 'production'
const env       = process.env.NODE_ENV

// Passport using github strategy
const passport = require('passport')

// Initialize session
app.use(session(sessionOptions))
app.use(passport.initialize())
app.use(passport.session())

// Add new strategy to the passport
passport.use(github.strategy(app, passport))

// Router has priority over static files
router.use(app)

// Server dist folder as static root
app.use(express.static('dist'))

// Listen for incoming requests
app.listen(port, () => {
    console.info(`🚀  HTTP Server started at ${protocol}://${host}:${port}`)
})

// Create WebSocket Server
websocketHandler(new websocket.Server({ port: wsPort }, () => {
    console.info(`🚀  WebSocket Server started at ws://${host}:${wsPort}`)
}))

// Output environment
console.info(dev ? chalk.magenta(`👉  Node Environment: ${env}`) : chalk.green(`👉  Production Mode`))
