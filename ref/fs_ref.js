const fs = require("fs"); // FIle System
const path = require("path")

// fs.mkdir(path.join(__dirname,"notes"),err=>{

//     if (err) throw new Error(err)

//     console.log("Папка была создана")
// })

// fs.writeFile(path.join(__dirname,"notes","notes.txt"),
//     "I exists Horraray",
//     (error) => {
//         if(error){
//             throw new Error(error)
//         }
//         console.log("Я был записан")
        
//         fs.appendFile(path.join(__dirname,"notes","notes.txt"),
//         " I appended here",error => {
//             if (error) {
//                 throw new Error(error)
//             }
//             console.log("Я был добавлен в существующий файл")

//             fs.readFile(
//                 path.join(__dirname,"notes","notes.txt"),
//                 "utf-8",
//                 (err,data) => {
//                 if (err) {throw new Error(err)}
//                 console.log(data)
//             })  
//         })
//     }
// )

// fs.rename(
//     path.join(__dirname,"notes"),
//     path.join(__dirname,"mynote"),
//     err => {
//         if (err) throw new Error(err);
//         console.log("Папка была переименованна")
//     }
// )

// fs.rename(
//     path.join(__dirname,"mynote"),
//     path.join(__dirname,"notes"),
//     err => {
//         if (err) throw new Error(err);
//         console.log("Папка была переименованна")
//     }
// )


