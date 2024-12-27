import React from 'react'
import Create from "./Create.jsx";

function Home(){
    const [todos, setTodos] = React.useState([]);
    return(
        <div className="home">
            <h2>ToDo List</h2>
            <Create />
            {
                todos.length === 0
                    ?
                    <div><h2>No Tasks</h2></div>
                    :
                todos.map((todo) => (
                <div>
                    {todo}
                </div>
            ))}
        </div>
    )
}

export default Home