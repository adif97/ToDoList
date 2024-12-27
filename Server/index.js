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
app.get("/get", (req, res) => {
    todoModel.find()
        .then(result => res.json(result))
        .catch(error => res.json(error))
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    todoModel.create({
        task: task
    })
        .then(result => res.json(result))
        .catch(error => res.json(error))
})

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    todoModel.findByIdAndUpdate({_id: id},{status: 4})
        .then(result => res.json(result))
        .catch(error => res.json(error))
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    todoModel.findByIdAndDelete({_id: id},{status: 4})
        .then(result => res.json(result))
        .catch(error => res.json(error))
})
app.listen(3001, () => console.log("Server started"));