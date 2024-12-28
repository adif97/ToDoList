const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
    task: String,
    description: String,
    edit_mode: {
        type: Boolean,
        default: false
    },
    create_time: {
        type: Date,
        default: Date.now()
    },
    update_time: {
        type: Date,
        default: Date.now()
    },
    due_time: {
        type: Date,
        default: null
    },
    assigned_user_id: {
        type: Number,
        default: 1
    },
    priority: Number,
    status: {
        type:Number,
        default:1}
})
const todoModel = mongoose.model("todos", todoSchema)
module.exports = todoModel