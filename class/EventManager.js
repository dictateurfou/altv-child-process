//only work with ipc because we use super for ref to socket for use callback

export default class EventManager{
    increment = 0
    eventList = {}
    callbackList = {}
    constructor(){
        //this.on("receivedCallback")
        this.on("receiveCallbackData", (funcRef,...args)=>{
            if(this.callbackList[funcRef] !== undefined){
                this.callbackList[funcRef](...args)
            }
        })
    }

    on(eventName,cb){
        if(this.eventList[eventName] == undefined) this.eventList[eventName] = []
        this.eventList[eventName].push(cb)
    }

    onCallBack(eventName, cb){
        this.on(eventName, async (funcRef,...args) =>{
            const rslt = await cb(...args)
            this.send("receiveCallbackData", funcRef, ...rslt)//function send its a reference of ipc
        })
    }

    saveCbRef(cb){
        const id = this.increment
        this.callbackList[id] = cb
        this.increment ++
        return id
    }

    remove(eventName){
        delete this.eventList[eventName]
    }

    call(eventName,...data){
        if (typeof this.eventList[eventName] !== 'undefined'){
            for(const v of this.eventList[eventName]){
                v(...data)
            }
        }
    }
}
