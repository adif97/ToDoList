import React from 'react'
import axios from 'axios'

function Create(){
    const [task, setTask] = React.useState([])
    const handleAdd = () => {
        axios.post('http://localhost:3001/add',{task:task})
            .then(result => location.reload())
            .catch(error => console.log(error))
    }
    return(
        <div className="create_form">
            <input type="text" placeholder='Enter new task' onChange={(e)=>setTask(e.target.value)} />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    )
}
export default Create