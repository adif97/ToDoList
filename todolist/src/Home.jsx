import React, {useEffect} from 'react'
import Create from "./Create.jsx";
import axios from "axios";
import {BsCheck, BsPencil, BsX} from "react-icons/bs";

function Home(){
    const [todos, setTodos] = React.useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/get")
            .then(result => setTodos(result.data))
            .catch(error => console.log(error))
    }, []);

    //edit status
    const handleEditStatus = (id, updated_status) => {
        axios.put("http://localhost:3001/updatestatus/" + id, {status: updated_status})
            .then(result => {
                console.log(result);
                location.reload();
            })
            .catch(error => console.log(error))
    }

    //edit priority
    const handleEditPriority = (id, updated_priority) => {
        axios.put("http://localhost:3001/updatepriority/" + id, {priority: updated_priority})
            .then(result => {
                console.log(result);
                location.reload();
            })
            .catch(error => console.log(error))
    }

    //toggle edit mode
    const handleToggleEditDesc = (id, bool) => {
        axios.put("http://localhost:3001/updatemode/" + id, {edit_mode: bool})
            .then(result => {
                console.log(result);
                location.reload();
            })
            .catch(error => console.log(error))
    }

    //save new description
    const handleSaveDesc = (id, newDesc) => {
        axios.put("http://localhost:3001/updatedesc/" + id, { description: newDesc })
            .then(result => {
                console.log(result);
                location.reload();
            })
            .catch(error => console.log(error))
    }

    //delete task (not from DB)
    const handleDeleteTask = (id) => {
        axios.delete("http://localhost:3001/deletetask/" + id)
            .then(result => {
                console.log(result);
                location.reload();
            })
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
                    todos
                        .filter(todo => todo.status !== 5) //dont show deleted tasks
                        .sort((a, b) => b.priority - a.priority) //sort by priority
                        .map((todo) => (
                        <div className="task" key={todo._id}>
                            <div className="dropDown">

                                <select
                                    value={todo.status}
                                    onChange={(e) => handleEditStatus(todo._id, Number(e.target.value))}
                                    className="statusDropDown">
                                    <option value={1}>Draft</option>
                                    <option value={2}>In Progress</option>
                                    <option value={3}>On Hold</option>
                                    <option value={4}>Completed</option>
                                </select>

                                <select
                                    value={todo.priority}
                                    onChange={(e) => handleEditPriority(todo._id, Number(e.target.value))}
                                    className="priorityDropDown">
                                    <option value="">-- Select Priority --</option>
                                    <option value={1}>Low</option>
                                    <option value={2}>Medium</option>
                                    <option value={3}>High</option>
                                    <option value={4}>Urgent</option>
                                </select>

                                <p className={todo.status === 4 ? "line_through" : ""}>{todo.task}</p>
                            </div>


                            <div className="description">
                                {todo.edit_mode ? (
                                    <>
                                    <textarea
                                        defaultValue={todo.description}
                                        onChange={(e) => (todo.newDescription = e.target.value)}
                                    />
                                        <BsCheck onClick={() => handleSaveDesc(todo._id, todo.newDescription)}/>
                                        <BsX className="icon" onClick={() => handleToggleEditDesc(todo._id, false)}/>
                                    </>
                                ) : (
                                    <>
                                        <p>{todo.description || ''}</p>
                                    </>
                                )}
                            </div>

                            <BsPencil
                                className="icon"
                                onClick={() => handleToggleEditDesc(todo._id, true)}
                            />
                            <BsX className="icon" onClick={() => handleDeleteTask(todo._id)}/>

                        </div>
                    ))}
        </div>
    )
}

export default Home