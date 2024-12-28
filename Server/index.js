const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const req = require("express/lib/request");
const todoModel = require('./Models/todo');

const app = express()
app.use(cors())
app.use(express.json())

//connection to the DataBase
mongoose.connect('mongodb://127.0.0.1:27017/DB')

//get a task from DB
app.get("/get", (req, res) => {
    todoModel.find()
        .then(result => res.json(result))
        .catch(error => res.json(error))
})

//add new task to DB
app.post('/add', (req, res) => {
    const {task} = req.body;
    const {description} = req.body;
    todoModel.create(
        {task: task, description: description})
        .then(result => res.json(result))
        .catch(error => res.json(error))
})

//update task on DB
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

    // Ensure that the `update_time` is added automatically
    updatedFields.update_time = Date.now();

    todoModel.findByIdAndUpdate({ _id: id }, updatedFields, { new: true })
        .then(result => res.json(result))
        .catch(error => res.status(500).json({ error: error.message }));
});
//change to deleted (status = 5) but keep the record in the DB
app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    todoModel.findByIdAndUpdate({_id: id},{status: 5, update_time: Date.now()},{new:true})
        .then(result => res.json(result))
        .catch(error => res.json(error))
})

app.listen(3001, () => console.log("Server started"));