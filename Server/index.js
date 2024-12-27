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
    const {task} = req.body;
    const {description} = req.body;
    todoModel.create(
        {task: task, description: description})
        .then(result => res.json(result))
        .catch(error => res.json(error))
})

app.put('/updatestatus/:id', (req, res) => {
    const {id} = req.params;
    const {status} = req.body;
    todoModel.findByIdAndUpdate({_id: id},{status}, {new:true})
        .then(result => res.json(result))
        .catch(error => res.json(error))
})
//change to deleted (status = 5) but keep the record in the DB
app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    todoModel.findByIdAndUpdate({_id: id},{status: 5} ,{new:true})
        .then(result => res.json(result))
        .catch(error => res.json(error))
})
app.listen(3001, () => console.log("Server started"));