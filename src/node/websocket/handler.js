"use strict"

const workerPattern = "worker-*"

const ip                = require('ip')
const redis             = require('redis')
const chalk             = require('chalk')
const messageHandler    = require('../message/handler')

/**
 * Handle Incoming Message
 * 
 * @param {Server} wsServer 
 */
const websocketHandler = wsServer => {

    const redisPub = redis.createClient({ url: process.env.REDIS_URL })
    const redisSub = redis.createClient({ url: process.env.REDIS_URL })

    // Start Listening for WebSocket Connections
    wsServer.on('connection', function connection(ws, req) {
        
        // Get client ip and port
        const header = req.headers['x-forwarded-for'] || ''
        const ipAddress = header.split(/\s*,\s*/)[0]
        const client = ipAddress || req.connection.remoteAddress + ":" + req.connection.remotePort

        // Send message to WebSocket client and console on close
        ws.on('close', function close() {
            redisSub.punsubscribe(workerPattern)
            console.log(chalk.blue(`WSOCK${client} disconnected`))
        });

        // Incoming message handler
        ws.on('message', function incoming(message) {
            messageHandler(ws, redisPub, client, message)
        })

        // Send message to WebSocket client
        ws.send(`Connected to ${ip.address()} on port ${req.connection.remotePort}`)

        // Confirmation 
        console.log(chalk.blue(`WSOCK${client} connected`))

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
        redisSub.psubscribe(workerPattern)
    })
}

module.exports = websocketHandler