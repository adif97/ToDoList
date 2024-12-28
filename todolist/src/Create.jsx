import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { handleAdd } from "./httpUtil.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Create() {
    const [task, setTask] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [due_time, setDueTime] = React.useState(null);
    const [priority, setPriority] = React.useState(null);
    const [status, setStatus] = React.useState(1);

    const addTask = () => {
        handleAdd({ task, description, priority, status, due_time, create_time: Date.now(), update_time: Date.now() })
            .then(() => {
                location.reload(); // Reload to reflect the new task
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h4 className="text-center text-primary mb-4">
                                Add a New Task
                            </h4>

                            {/* task name text box */}
                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="Task Title"
                                    value={task}
                                    onChange={(e) => setTask(e.target.value)}
                                    className="form-control form-control-sm"
                                />
                            </div>

                            {/* description text box */}
                            <div className="mb-3">
                                <textarea
                                    placeholder="Task Description (Optional)"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    className="form-control form-control-sm"
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="mb-3">

                                {/* priority dropdown */}
                                <label className="form-label">
                                    Priority
                                </label>
                                <select
                                    value={priority}
                                    onChange={(e) =>
                                        setPriority(Number(e.target.value))
                                    }
                                    className="form-select form-select-sm"
                                >
                                    <option value={1}>Low</option>
                                    <option value={2}>Medium</option>
                                    <option value={3}>High</option>
                                    <option value={4}>Urgent</option>
                                </select>
                            </div>
                            <div className="mb-3">

                                {/* status dropdown */}
                                <label className="form-label">Status</label>
                                <select
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(Number(e.target.value))
                                    }
                                    className="form-select form-select-sm"
                                >
                                    <option value={1}>Draft</option>
                                    <option value={2}>In Progress</option>
                                    <option value={3}>On Hold</option>
                                    <option value={4}>Completed</option>
                                </select>
                            </div>

                            {/* due_time calendar */}
                            <div className="mb-3">
                                <label className="form-label">Due Date</label>
                                <DatePicker
                                    selected={due_time}
                                    onChange={(date) => setDueTime(date)}
                                    className="form-control form-control-sm"
                                    dateFormat="yyyy-MM-dd"
                                    isClearable
                                    placeholderText="Optional"
                                />
                            </div>

                            {/* add button */}
                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={addTask}
                                    className="btn btn-success btn-sm w-100"
                                >
                                    Add Task
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;