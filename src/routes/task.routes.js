const express=require('express');
const router = express.Router();

const Task = require('../models/task');


//leer todas las tareas
router.get('/', async (req,res) => { //
    const tasks = await Task.find();
    res.json(tasks);

});

//leer una tarea especifica
router.get('/:id', async(req, res)=>{
    const task = await Task.findById(req.params.id);
    res.json(task);
}
)

//agregar una tarea nueva
router.post('/', async (req, res)=>{
    const {title, description} = req.body;
    const task = new Task({title, description})
    await task.save();
    res.json({status: "tarea guardada"});
});

//actualizar una tarea de acuerdo al id
router.put('/:id', async (req, res) => {
    const{title, description} = req.body;
    const newTask = {title, description};
    await Task.findByIdAndUpdate(req.params.id, newTask)
    
    res.json({status: "tarea actualizada"});

})

//eliminar
router.delete('/:id', async (req,res)=>{
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: "Tarea eliminada"});
});

module.exports = router;