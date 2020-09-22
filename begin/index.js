const http = require("http");

const server = http.createServer((req,res) => {
    console.log(req.url)
    if (req.method === "GET"){
        console.log("От меня что-то хотят")
        
        res.end(`
                <h1>Form</h1>
                <form method="post" action="/">
                    <input type="text" name= "some-text"/>
                    <button type="submit">Send text</button>
                </form>
            `)
    }
    else if (req.method === "POST"){
        const body = []
        res.writeHead(200,{"Content-type":"text/html;charset=utf-8"})

        req.on("data",(data) => {
            body.push(Buffer.from(data))
        })

        req.on("end",() =>{
            const message = body[0].toString().split("=")[1];
        

        res.end(`
            <h1>Ваш ответ : ${message}</h1>
        `)

    })
    }
})

server.listen(3000,() =>{
    console.log("Сервер запущен")
})