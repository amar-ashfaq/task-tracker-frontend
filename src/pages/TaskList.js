import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function TaskList() {

    const [taskItems, setTaskItems] = useState([]);

    useEffect(() => {
        fetch("https://localhost:7130/api/Tasks")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }
            return response.json();
        })
        .then(data => setTaskItems(data))
        .catch(error => console.error("Fetch error:", error));
    }, [])

    if (taskItems.length === 0) {
        return <p>Loading tasks...</p>
    }

    return (
        <div>
            <h2>Task List</h2>
            <p>This is where all the tasks are shown.</p>

            <ul>
                {taskItems.map((task) => (
                    <li key={task.id}>
                        {task.title} |
                        <Link to={`/tasks/${task.id}`}> View Details</Link>                         
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;