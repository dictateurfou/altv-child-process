import Ipc from './Ipc.js'
import { spawn } from 'child_process'

export default class Fork extends Ipc {
    isReady = false

    constructor (path, options = {}, ...args) {
        if (options.stdio == undefined) {
            options = {
                stdio: ['pipe', 'pipe', 'pipe', 'ipc']
            }
        }
        const process = spawn('node', [path, ...args], options)
        super(process)
        process.stdout.on('data', this.onStdout)
        process.stderr.on('data', this.onStderr)
        process.on('error', this.onError)
        process.on('close', this.onClose)
        this.on("ready", () => {
            console.log("ipc channel is ready")
            this.isReady = true
        })
    }

    onError (error) {
        console.error(`error: ${error.message}`)
    }

    onStderr (data) {
        console.error(`stderr: ${data}`)
    }

    onStdout (data) {
        console.log(data.toString())
    }

    onClose (code) {
        console.log(`child process exited with code ${code}`)
    }
}
