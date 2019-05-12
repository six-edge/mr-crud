"use strict"

// Load .env file
require('dotenv').config()

const express           = require('express')
const app               = express()
const ip                = require('ip')
const chalk             = require('chalk');
const router            = require('./router')
const github            = require('./strategies/github')
const broker            = require('./broker')
const redis             = require('redis')
const redisSession      = redis.createClient({ url: process.env.REDIS_URL })
const redisPub          = redis.createClient({ url: process.env.REDIS_URL })
const redisSub          = redis.createClient({ url: process.env.REDIS_URL })
const session           = require('express-session')
const sessionStore      = require('connect-redis')(session)
const sessionOptions    = require('./session')(redisSession, sessionStore)
const websocket         = require('ws');
const protocol          = process.env.PROTOCOL = process.env.PROTOCOL || 'http'
const host              = process.env.HOST = process.env.HOST || 'localhost'
const port              = process.env.HTTP_PORT = process.env.HTTP_PORT || 5000
const wsPort            = process.env.WS_PORT = process.env.WS_PORT || 5050
const debug             = process.env.NODE_ENV !== 'production'
const env               = process.env.NODE_ENV

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
    const info = debug ? `in ${env} mode!` : ''
    console.info(`🚀  Server started at ${protocol}://${host}:${port} ${info}`)
})

// Create WebSocket Server
const wss = new websocket.Server({ port: wsPort })

// Broadcast Method
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === websocket.OPEN) {
            client.send(data)
        }
    });
};

// Start Listening for WebSocket Connections
wss.on('connection', function connection(ws, req) {
    
    // Get IP from header
    const header = req.headers['x-forwarded-for'] || ''
    const ipAddress = header.split(/\s*,\s*/)[0];

    // Get client ip and port
    const client = ipAddress || req.connection.remoteAddress + ":" + req.connection.remotePort
    
    ws.on('message', function incoming(message) {

        // todo: implement message broker
        if (message.substr(0, 9) === 'broadcast') {
            const payload = message.substr(10)
            wss.broadcast(payload)
            console.log(chalk.blue(`WSOCK${client} broadcast: ${payload}`))
        } else {
            ws.send(`echo: ${message}`)
            console.log(chalk.blue(`WSOCK${client} received: ${message}`))
        }
    })

    // Redis Pattern Subscribe to worker-*
    redisSub.on("psubscribe", function (channel, count) {
        console.log(chalk.red(`REDIS${client} subscribed to pattern "${channel}" with ${count} listeners`))
    })
    
    // Redis on message receive
    redisSub.on("pmessage", function (pattern, channel, message) {
        console.log(chalk.red(`REDIS${client} received message "${message}" on channel "${channel}"`))
        ws.send(message)
    })
    
    // Execute Command
    redisSub.psubscribe("worker-*")

    // Send message to WebSocket client
    ws.send(`Connected to ${ip.address()} on port ${req.connection.remotePort}`)

    // Confirmation
    console.log(chalk.blue(`WSOCK${client} connected`))
});


