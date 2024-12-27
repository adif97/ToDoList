const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
    task: String,
    description: String,
    status: {
        type:Number,
        default:1}
})
const todoModel = mongoose.model("todos", todoSchema)
module.exports = todoModel