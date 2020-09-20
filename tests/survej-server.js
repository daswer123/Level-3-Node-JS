const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer( (request,response) =>{

    if (request.method === "POST" && request.url === "/"){
        const body = []

        request.on("data",data =>{
            body.push(Buffer.from(data).toString())
        })

        response.on("end",(err)=>{

            response.writeHead(200,{
                "Content-type" : "text/html;charset=utf-8"
            })

           let counter = 0;
           let res =  body[0].split("&").join(" ")
           res = res.replace(/\w*=/ig," ").split("  ")

           if(res[2] === "true"){
               counter += 1
           }

           if(res[3] === "true"){
            counter += 1
        }

        let yourIQ = "";

        switch (counter){
            case 0:
               yourIQ= "картошка";
               break 
            case 1:
                yourIQ= "апельсин";
                break
            case 2:
                yourIQ= "Человек!";
                break
        }

            response.end(`
                <h1>Мы получили ваши ответы</h1>
                <h2>Вас зовут ${res[0]}, вам ${res[1]} лет</h2>
                <h2>Вы ответели правильно на ${counter} из 2 вопросов</h2>
                <h2>Ваш уровень интелекта = ${yourIQ}</h2>
                <h2>Вы бы хотели ${res[4] ? res[4] : ""}, ${res[5] ? res[5] : ""}, ${res[6] ? res[6] : ""} но вы этого не получите</h2>
                <h2>Спасибо за участие в моей викторине</h2>

            `)
        })

    }

    if(request.url === "/about"){
        fs.readFile(path.join(__dirname,"","about-page.html"),(err,data)=>{
            if(err) throw Error(err)
            response.writeHead(200,{
                "Content-type" : "text/html;charset=utf-8"
            })
            console.log(Buffer.from(data).toString())
            response.end(Buffer.from(data).toString())
        })
    }


    if (request.url === "/"){
        response.writeHead(200,{
            "Content-type" : "text/html;charset=utf-8"
        })
        response.end(`
            <h2>Викторина</h2>
            <form method="post" action="/">
                <label>
                    Ваше имя
                    <input type="text" name="name" placeholder="Введите своё имя"/>
                </label>
                <label>
                    Ваше возраст
                    <input type="number" name="age" placeholder="Введите свой возраст"/>
                </label>
                <br/>
                <label> 
                <br/>
                    Сколько будет 2+2
                    <br/>
                    4 <input type="radio" name="answer" value="true">
                    3 <input type="radio" name="answer" value="false">
                    5 <input type="radio" name="answer" value="false">
                    6 <input type="radio" name="answer" value="false">
                </label>
                <br/>
                    Арбуз это ягода
                    <br/>
                    Да <input type="radio" name="melon" value="true">
                    Нет <input type="radio" name="melon" value="false">
                </label>
                <br/>
                    Что вы бы хотели иметь
                    <br/>
                    Машину <input type="checkbox" name="iwant" value="Audi">
                    Дом <input type="checkbox" name="iwant" value="Penthouse">
                    Деньги <input type="checkbox" name="iwant" value="1000000000">
                </label>
                <br/>
                <button>Узнать результат</button>
            </form>
        `)
    }

    
})

server.listen(3000,() =>{
    console.log("Запуск сервера...")
})