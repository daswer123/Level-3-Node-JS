const Router = require("express");
const router = Router();

const Task = require("../models/task")

function tryCatch(func){
    try {
        func()
    } catch(err){
        console.log(err);
        res.status(500).json({
            message : "Server Error"
        })
    }
}

router.get("/",(req,res) => {
    tryCatch(async () => {
        const tasks = await Task.findAll();
        res.status(200).json(tasks)
    })
})

router.post("/", (req,res) => {
    tryCatch( async () => {
       const task = await Task.create({
            title : req.body.title,
            done : false
        })
        res.status(201).json({task})
    })
})

router.put("/:id", (req,res) => {
    tryCatch( async () => {
        const task = await Task.findByPk(+req.params.id);
        task.done = req.body.done
        await task.save()
        res.status(200).json(task)
    })
})

router.delete("/:id", (req,res) => {

    tryCatch( async () => {
        await Task.destroy({
            where: {
                id : req.params.id
            }
        })
        res.status(200).json({message : "Job done"})
    })
    
})

module.exports = router