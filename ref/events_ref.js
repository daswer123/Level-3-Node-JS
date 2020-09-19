const { EventEmitter } = require("events");
const eventEmitter = require("events");

class Logger extends EventEmitter{
    log(message) {
        this.emit("message", `${message} ${Date.now()}`)
    }
}

const logger = new Logger()

logger.on("message",data=>{
    console.log(data)
})

logger.log("hello")
logger.log("hello")
logger.log("hello")
logger.log("hello")
