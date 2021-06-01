"use strict"

const chalk = require('chalk');
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
    const dataFeedUpdateInterval = 1000

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

    const startDataFeed = (id) => {
        if (!id) {
            console.log(chalk.yellow(idErrMsg))
            ws.send(idErrMsg)
            return
        }
        const sendRandomNumber = () => ws.send(JSON.stringify({ id, value: Math.random() }))
        const interval = setInterval(sendRandomNumber, dataFeedUpdateInterval)
        subscriptions.set(msg.id, interval);
    }

    const stopDataFeed = (id) => {
        if (!id) {
            console.log(chalk.yellow(idErrMsg))
            return ws.send(idErrMsg)
        }
        if (!subscriptions.has(id)) {
            const noSubErrMsg = `ERROR::No subscription found with id ${msg.id}`
            console.log(chalk.yellow(noSubErrMsg))
            return ws.send(noSubErrMsg)
        }
        clearTimeout(subscriptions.get(msg.id))
        subscriptions.delete(msg.id)
    }

    const unknownEventHandler = (id) => {
        const unknownEventErrMsg = `Unknown event ${msg.event}`
        console.log(chalk.red(unknownEventErrMsg))
        ws.send({
            error: unknownEventErrMsg,
            id
        })
    }

    switch (msg.event) {

        case 'subscribe':
            startDataFeed(msg.id);
            break;

        case 'unsubscribe':
            stopDataFeed(msg.id)
            break;

        default:
            unknownEventHandler(msg.id)
            break;
    }
    return true;
}

module.exports = messageHandler
