"use strict"

const chalk = require('chalk');

/**
 * Handle Incoming Message
 * 
 * @param {*} ws 
 * @param {*} client 
 * @param {*} message 
 */
const messageHandler = (ws, client, message) => {

    let messageObj = {}
    let isJson = true

    try {
        messageObj = JSON.parse(message);
    } catch(e) {
        isJson = false
    }

    if (!isJson) {
        ws.send(`echo: ${message}`)
        console.log(chalk.blue(`WSOCK${client} received: ${message}`))
        return true;
    }

    if (!messageObj.event) {
        console.log(chalk.yellow('ERROR::Invalid Message! Must contain an event!'))
        return false;
    }

    switch (messageObj.event) {
    
        case 'broadcast':

            console.log(chalk.red(`WSOCK${client} broadcast: ${message}`))
            break;

        case 'echo':
            ws.send(`echo: ${message}`)
            console.log(chalk.blue(`WSOCK${client} received: ${message}`))
            break;

        default:

            console.log(chalk.red(`NOP`))
            break;
    }    
    return true;
}

module.exports = messageHandler