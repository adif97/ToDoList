import React from 'react'
import {handleAdd} from "./httpUtil.jsx";

function Create(){
    const [task, setTask] = React.useState("")
    const [description, setDescription] = React.useState("")
    const addTask = () => {
        handleAdd({ task:task, description:description })
            .then(() => {
                location.reload(); // Reload to reflect the new task
            })
            .catch((error) => console.log(error));
    };

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
            <button type="button" onClick={addTask}>Add</button>
        </div>
    )
}
export default Create