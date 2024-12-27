import React, {useEffect} from 'react'
import Create from "./Create.jsx";
import axios from "axios";
import {BsCheck2Square, BsSquare, BsSquareFill, BsX} from "react-icons/bs";

function Home(){
    const [todos, setTodos] = React.useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/get")
            .then(result => setTodos(result.data))
            .catch(error => console.log(error))
    }, []);

    //edit function
    const handleEdit = (id, updated_status) => {
        axios.put("http://localhost:3001/update/" + id, {status: updated_status})
            .then(result => location.reload())
            .catch(error => console.log(error))
    }

    //delete function
    const handleDelete = (id) => {
        axios.delete("http://localhost:3001/delete/" + id)
            .then(result => location.reload())
            .catch(error => console.log(error))
    }
    return(
        <div className="home">
            <h2>ToDo List</h2>
            <Create />
            {
                todos.length === 0
                    ?
                    <div><h2>No Tasks</h2></div>
                    :
                    todos.filter(todo => todo.status !== 5).map((todo) => (
                    <div className="task" key={todo._id}>
                        <div className="dropDown">
                        <select
                            value={todo.status}
                            onChange={(e) => handleEdit(todo._id, Number(e.target.value))}
                            className="statusDropDown">
                            <option value={1}>Draft</option>
                            <option value={2}>In Progress</option>
                            <option value={3}>On Hold</option>
                            <option value={4}>Completed</option>
                        </select>
                            <p className={todo.status === 4 ? "line_through" : ""}>{todo.task}</p>
                    </div>
                <div>
                            <span><BsX className="icon" onClick={() => handleDelete(todo._id)}/></span>
                        </div>
                    </div>
            ))}
        </div>
    )
}

export default Home