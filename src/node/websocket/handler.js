"use strict"

const ip             = require('ip')
const chalk          = require('chalk')
const messageHandler = require('../message/handler')

/**
 * Handle Incoming Message
 * 
 * @param {Server} wsServer 
 */
const websocketHandler = wsServer => {

    // Start Listening for WebSocket Connections
    wsServer.on('connection', function connection(ws, req) {
        
        const noUser = req.session.passport === undefined || req.session.passport.user === undefined
        const wsAuthEnabled = Number(process.env.WS_AUTH) !== 0
        
        // Check if the client is authenticated
        if (wsAuthEnabled && noUser) {
            ws.terminate()
        } else {
            
            // Get client ip and port
            const header = req.headers['x-forwarded-for'] || ''
            const ipAddress = header.split(/\s*,\s*/)[0]
            const client = ipAddress || req.connection.remoteAddress + ":" + req.connection.remotePort

            // Send message to WebSocket client and console on close
            ws.on('close', function close() {
                console.log(chalk.blue(`WSOCK${client} disconnected`))
            });

            // Incoming message handler
            ws.on('message', function incoming(message) {
                messageHandler(ws, client, message)
            })

            // Send message to WebSocket client
            ws.send(`Connected to ${ip.address()} on port ${req.connection.remotePort}`)

            // Confirmation 
            console.log(chalk.blue(`WSOCK${client} connected`))
        }
    })
}

module.exports = websocketHandler