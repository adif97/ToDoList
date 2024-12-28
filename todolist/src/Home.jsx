import React, {useEffect} from 'react'
import Create from "./Create.jsx";
import axios from "axios";
import {BsCheck, BsPencil, BsX} from "react-icons/bs";
import {getTasks, handleUpdateTask, handleDeleteTask} from "./httpUtil.jsx";

function Home(){
    const [todos, setTodos] = React.useState([]);
    useEffect(() => {
        getTasks()
            .then((tasks) => setTodos(tasks))
            .catch((error) => console.error(error));
    },[]);

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
                                    onChange={(e) =>  handleUpdateTask(todo._id, {status: Number(e.target.value)})}
                                    className="statusDropDown">
                                    <option value={1}>Draft</option>
                                    <option value={2}>In Progress</option>
                                    <option value={3}>On Hold</option>
                                    <option value={4}>Completed</option>
                                </select>

                                <select
                                    value={todo.priority}
                                    onChange={(e) => handleUpdateTask(todo._id, {priority:(e.target.value)})}
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
                                        <BsCheck onClick={() =>  handleUpdateTask(todo._id, {description: todo.newDescription})}/>
                                        <BsX className="icon" onClick={() =>  handleUpdateTask(todo._id, {edit_mode:false})}/>
                                    </>
                                ) : (
                                    <>
                                        <p>{todo.description || ''}</p>
                                    </>
                                )}
                            </div>

                            <BsPencil
                                className="icon"
                                onClick={() => handleUpdateTask(todo._id, {edit_mode:true})}
                            />
                            <BsX className="icon" onClick={() => handleDeleteTask(todo._id)}/>

                        </div>
                    ))}
        </div>
    )
}

export default Home