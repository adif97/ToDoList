import { useEffect, useState } from "react";
import Create from "./Create.jsx";
import { getTasks, handleUpdateTask, handleDeleteTask } from "./httpUtil.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

function Home() {
    //display tasks
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        getTasks()
            .then((tasks) => setTodos(tasks))
            .catch((error) => console.error(error));
    }, []);

    //priority function color
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 4:
                return { backgroundColor: "#FFCCCC", color: "#FF0000" };
            case 3:
                return { backgroundColor: "#FFE5CC", color: "#FF6600" };
            case 2:
                return { backgroundColor: "#FFFFCC", color: "#FFCC00" };
            case 1:
                return { backgroundColor: "#CCE5FF", color: "#007BFF" };
            default:
                return {};
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center text-primary mb-4">To-Do List</h2>
            <Create />
            {todos.length === 0 ? (
                <div className="text-center mt-4">
                    <h4 className="text-muted">No Tasks</h4>
                </div>
            ) : (
                <div className="row mt-4">
                    {todos
                        .filter((todo) => todo.status !== 5) //dont include status = 5 > deleted
                        .sort((a, b) => b.priority - a.priority) //sort by priority
                        .map((todo) => (
                        <div
                            key={todo._id}
                            className="col-12 col-md-6 col-lg-4 mb-4"
                        >
                            <div
                                className="card shadow-sm"
                                style={{
                                    ...getPriorityColor(todo.priority),
                                    borderRadius: "8px",
                                }}
                            >
                                {/* task name */}
                                <div className="card-body p-3">
                                    <input
                                        type="text"
                                        value={todo.task}
                                        onChange={(e) =>
                                            handleUpdateTask(todo._id, {
                                                task: e.target.value,
                                            })
                                        }
                                        className="form-control form-control-sm mb-2"
                                        placeholder="Task name"
                                    />
                                    {/* description */}
                                    <textarea
                                        value={todo.description || ""}
                                        onChange={(e) =>
                                            handleUpdateTask(todo._id, {
                                                description: e.target.value,
                                            })
                                        }
                                        rows="2"
                                        className="form-control form-control-sm mb-2"
                                        placeholder="Description"
                                    ></textarea>
                                    {/* due time */}
                                    <div className="mb-2">
                                        <label className="form-label">
                                            Due Date
                                        </label>
                                        <DatePicker
                                            selected={
                                                todo.due_time
                                                    ? new Date(todo.due_time)
                                                    : null
                                            }
                                            onChange={(date) =>
                                                handleUpdateTask(todo._id, {
                                                    due_time: date,
                                                })
                                            }
                                            className="form-control form-control-sm"
                                            dateFormat="yyyy-MM-dd"
                                            isClearable
                                            placeholderText="Optional"
                                        />
                                    </div>

                                    {/* status */}
                                    <div className="d-flex justify-content-between align-items-center">
                                        <select
                                            value={todo.status}
                                            onChange={(e) =>
                                                handleUpdateTask(todo._id, {
                                                    status: Number(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                            className="form-select form-select-sm"
                                        >
                                            <option value={1}>Draft</option>
                                            <option value={2}>
                                                In Progress
                                            </option>
                                            <option value={3}>On Hold</option>
                                            <option value={4}>
                                                Completed
                                            </option>
                                        </select>

                                        {/* priority */}
                                        <select
                                            value={todo.priority}
                                            onChange={(e) =>
                                                handleUpdateTask(todo._id, {
                                                    priority: Number(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                            className="form-select form-select-sm"
                                        >
                                            <option value="">
                                                -- Priority --
                                            </option>
                                            <option value={1}>Low</option>
                                            <option value={2}>Medium</option>
                                            <option value={3}>High</option>
                                            <option value={4}>Urgent</option>
                                        </select>

                                        {/* delete */}
                                        <button
                                            onClick={() =>
                                                handleDeleteTask(todo._id)
                                            }
                                            className="btn btn-sm btn-danger ms-2"
                                            title="Delete Task"
                                        >
                                            X
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                </div>
            )}
        </div>
    );
}

export default Home;