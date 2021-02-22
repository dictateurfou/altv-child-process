import EventManager from './EventManager.js'

export default class Ipc extends EventManager {
    process

    constructor (process) {
        super()
        this.process = process
        this.process.on('message', (message) => {
            this.onMessage(message)
        })
        this.send("ready")
    }

    send (event, ...data) {
        const arg = [...data]
        const ret = {}

        ret.data = arg
        ret.event = event
        this.process.send(ret)
    }

    sendCb (event, cb, ...args) { // for the game
        const arg = [this.saveCbRef(cb), ...args]
        const ret = {}

        ret.data = arg
        ret.event = event
        this.process.send(ret)
    }

    sendAsync (eventName, ...args) {
        return new Promise((resolve, reject) => {
            this.sendCb(eventName, (...values) => {
                if (values.length > 1) {
                    resolve(values)
                } else {
                    resolve(...values)
                }
            }, ...args)
            setTimeout(() => { reject(new Error("timeout reject fork process")) }, 10000)
        })
    }

    onMessage (message) {
        this.call(message.event, ...message.data)
    }
}
