import React from 'react'
import axios from 'axios'
import DatePicker from "react-datepicker";

function Create(){
    const [task, setTask] = React.useState([])
    const [description, setDescription] = React.useState('')

    const handleAdd = () => {
        axios.post('http://localhost:3001/add',
            {task:task,
                description:description
               })
            .then(result => location.reload())
            .catch(error => console.log(error))
    }
    return(
        <div className="create_form">
            <input type="text"
                   placeholder="Add new task"
                   value={task}
                   onChange={(e)=>setTask(e.target.value)}
            />
            <textarea placeholder="Add task description (optional)"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    )
}
export default Create