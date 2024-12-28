import axios from "axios";

//get tasks
export const getTasks = () => {
    return axios.get("http://localhost:3001/get")
        .then(result => result.data)
        .catch(error => console.log(error));
};
//add task
export const handleAdd = (taskData) => {
    return axios.post('http://localhost:3001/add',
        taskData)
        .then((result) =>
           result.data)
        .catch(error => console.log(error))
}

//edit task
export const handleUpdateTask = (id, updatedFields) => {
    return axios.put("http://localhost:3001/update/" + id, updatedFields)
        .then((result) => {
            console.log(result);
            location.reload();
        })
        .catch((error) => console.log(error));
};

//delete task (not from DB)
export const handleDeleteTask = (id) => {
    return axios.delete("http://localhost:3001/delete/" + id)
        .then(result => {
            console.log(result);
            location.reload();
        })
        .catch(error => console.log(error))
}
