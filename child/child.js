import Ipc from '../class/Ipc.js'
const ipc = new Ipc(process)

ipc.on("myEvent", () => {
    console.log("call de myEvent on child process")
    console.log("call de myEvent on child process 2")
})

ipc.onCallBack("addition", (data1, data2) => {
    return [data1 + data2]
})

ipc.onCallBack("twoParameterExemple", (data1, data2) => {
    return [data1 + data2, "param2"]
})

ipc.send('myEvent', 5, 6)
