import Fork from './class/Fork.js'

const childProcess = new Fork("./child/child.js",{})
childProcess.on("myEvent", function(data,data2){
    console.log("passe dans my event")
    console.log(data,data2)
})


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

//test()

/*
setTimeout(async ()=>{
    let i = 0
    while(i < 1){
        await test()
        i++;
    }

    childProcess.sendCb("addition", (value)=>{
        console.log("passe dans send cb value = ", value)
    }, 5,5)
},1000)*/
