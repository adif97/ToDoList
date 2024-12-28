const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
    task: String,
    description: String,
    create_time: Date,

    update_time: Date,
    due_time: Date,
    assigned_user_id: {
        type: Number,
        default: 1
    },
    priority: Number,
    status: Number
})
const todoModel = mongoose.model("todos", todoSchema)
module.exports = todoModel