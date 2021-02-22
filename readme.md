# child process ipc
`/!\ require nodejs v14 (if you use docker make sure docker have the right version for node) /!\`
#
`actually the path in index is './child/child.js' but on alt:v this relative path not work change the path if you need to use in alt`

# Table of Contents
##### 1. [Init](#Init)
##### 2. [Event System](#event)
##### 3. [Benchmark](#benchmark)
## Init
###### 1) init child process
#
```JS
import Fork from './class/Fork.js'
const childProcess = new Fork("./resources/redside/server/fork/child/child.js") //path start in folder of altv exec
```
#
# Event
## 1) add event this work in two way
#### (on main program)
#
```JS
import Fork from './class/Fork.js'
const childProcess = new Fork("./resources/redside/server/fork/child/child.js")
childProcess.on("myEvent", function(data,data2){
    console.log("passe dans my event")
    console.log(data,data2)
})
```
##### if you need to send event when you child process is created use ready event
#
```JS
async function test(){
    const rslt = await childProcess.sendAsync("addition", 1,2)
    console.log("result of addition is ", rslt)
    childProcess.send("myEvent")

    const [calc,secondParameter] = await childProcess.sendAsync("twoParameterExemple",10,10)
    console.log(calc)
    console.log(secondParameter)
    childProcess.sendCb("addition", (value)=>{
        console.log("passe dans send cb value = ", value)
    }, 5,5)
}

childProcess.on('ready', async () => {
    test()
})
//if you make test call here he doesn't work use ready
//test()
```

#### (on child program)
```JS
import Ipc from '../class/Ipc.js'
const ipc = new Ipc(process)

ipc.on("myEvent", ()=>{
    console.log("call de myEvent on child process")
    console.log("call de myEvent on child process 2")
})

ipc.onCallBack("addition", (data1,data2)=>{
    return [data1 + data2]
})

ipc.send('myEvent',5,6)
```
# benchmark
##### for callback response with ipc
on alt dev branch
`1ms`
on alt release branch (slow due to event loop problem on release branch)
`50ms`
on node program (it's very fast on node program)
`0.2000 ms`
