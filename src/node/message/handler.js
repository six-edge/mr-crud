"use strict"

const chalk = require('chalk');

// const { subscribe } = require('./messages.js');

const subscriptions = new Map();

/**
 * Handle Incoming Message
 * 
 * @param {*} ws 
 * @param {*} client 
 * @param {*} message 
 */
const messageHandler = (ws, client, message) => {

    console.log(chalk.blue(`WSOCK${client} received: ${message}`))
    
    const idErrMsg = 'ERROR::Invalid Message! Must contain an id!'
    const eventErrMsg = 'ERROR::Message must have an `event` property!'

    let msg = {}
    let isJson = true

    try {
        msg = JSON.parse(message);
    } catch(e) {
        isJson = false
    }

    if (!isJson) {
        ws.send(`I dont understand ${message} :(`)
        return true;
    }

    if (!msg.event) {
        console.log(chalk.yellow(eventErrMsg))
        ws.send(eventErrMsg)
        return false;
    }

    switch (msg.event) {

        case 'subscribe':
            if (!msg.id) {
                console.log(chalk.yellow(idErrMsg))
                ws.send(idErrMsg)
                break;
            }
            const sendRandomNumber = () => ws.send(JSON.stringify({ id: msg.id, value: Math.random() }))
            const interval = setInterval(sendRandomNumber, 1000)
            subscriptions.set(msg.id, interval);
            break;

        case 'unsubscribe':
            if (!msg.id) {
                console.log(chalk.yellow(idErrMsg))
                ws.send(idErrMsg)
                break;
            }
            if (!subscriptions.has(msg.id)) {
                const noSubErrMsg = `ERROR::No subscription found with id ${msg.id}`
                console.log(chalk.yellow(noSubErrMsg))
                ws.send(noSubErrMsg)
                break;
            }
            clearTimeout(subscriptions.get(msg.id))
            subscriptions.delete(msg.id)
            break;

        default:
            const unknownEventErrMsg = `Unknown event ${msg.event}`
            console.log(chalk.red(unknownEventErrMsg))
            ws.send(unknownEventErrMsg)
            break;
    }    
    return true;
}

module.exports = messageHandler