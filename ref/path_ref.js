const path = require("path");

console.log(__filename)
console.log(path.basename(__filename))
console.log(path.dirname(__filename))
console.log(path.extname(__filename))

console.log(path.parse(__filename))

console.log(path.join(__dirname,"test/hello","index.js"))
console.log(path.resolve(__dirname,"first/hi/joc/","index.js"))

//documetation https://nodejs.org/dist/latest-v12.x/docs/api/path.html