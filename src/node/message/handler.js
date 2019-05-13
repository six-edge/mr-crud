"use strict"

const chalk = require('chalk');

/**
 * Handle Incoming Message
 * 
 * @param {*} ws 
 * @param {*} redis 
 * @param {*} client 
 * @param {*} message 
 */
const messageHandler = (ws, redis, client, message) => {

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
        const payload = 'ERROR::Invalid Message! Must contain an event!'
        redis.publish('worker-broadcast', payload)
        console.log(chalk.yellow(payload))
        return false;
    }

    switch (messageObj.event) {
        
        case 'upload':
            console.log(chalk.gray('TODO::Upload file to S3'))
            console.log(chalk.gray('TODO::Then publish message to workers to download the file'))
            break;
    
        case 'broadcast':
            redis.publish('worker-broadcast', message)
            console.log(chalk.red(`REDIS${client} broadcast: ${message}`))
            break;

        case 'echo':
            ws.send(`echo: ${message}`)
            console.log(chalk.blue(`WSOCK${client} received: ${message}`))
            break;

        default:
            redis.publish('event', message)
            console.log(chalk.red(`REDIS${client} published: ${message} on event channel`))
            break;
    }    
    return true;
}

module.exports = messageHandler