const os = require("os");

console.log(os.platform())

console.log(os.arch())

// console.log(os.cpus())

console.log(os.totalmem())

console.log(os.freemem())

console.log(os.homedir())

console.log(os.uptime())


// Небольшая программа

const yourOS = os.platform();
const yourArch = os.arch();
const yourMem = os.totalmem()/1024/1024
const yourTime = os.uptime()

console.log(`
    Ваша платформа : ${yourOS}
    Ваша архтектура системы : ${yourArch}
    Ваша операционная система : ${os.version()}
    У вас : ${Math.round(yourMem)} MB Оперативной памяти
    Из всей свободно: ${Math.floor(os.freemem / (os.totalmem/100))}%
    Ваш компьютер работает уже : ${Math.round(yourTime/3600)} часов ${Math.round(yourTime/60/60)} минут
    Ваш Ip : ${os.networkInterfaces().Ethernet[1].address}
`)