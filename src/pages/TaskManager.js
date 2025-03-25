import { useState, useEffect } from "react";
import TaskCreate from "./TaskCreate";

function TaskManager() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch("https://localhost:7130/api/Tasks/")
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch((err) => console.error("Error fetching tasks:", err));
    }, []);

    const addTaskToList = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    return (
        <div>
            <TaskCreate onTaskCreated={addTaskToList} />
        </div>
    )
}

export default TaskManager;
