import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../TaskList.css';  // Import the CSS file

function TaskList() {

    const [taskItems, setTaskItems] = useState([]); // for an array
    const [taskItem, setTaskItem] = useState(null); // for an object

    function handleCheckboxChange(taskId) {
        console.log(`Selected checkbox task id: ${taskId}`)

        let taskItem = taskItems.find((element) => element.id === taskId);

        // Toggle the isCompleted status
        taskItem.isCompleted = !taskItem.isCompleted;

        setTaskItem(taskItem);
    }

    useEffect(() => {
        if (taskItem) {
            fetch(`https://localhost:7130/api/Tasks/${taskItem.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: taskItem.title, 
                                        description: taskItem.description, 
                                        isCompleted: taskItem.isCompleted 
                })
            })
            .then(response => {
                    if (!response.ok) {
                        throw new Error("Something went wrong with the response!");
                    }
                    return response.json();
            })
            .then(data => {
                    console.log("Updated task:", data);
                    setTaskItems(prevItems => prevItems.map(item => item.id === data.id ? data : item))
            })
            .catch(error => console.error('Error updating task:', error));
        }
   }, [taskItem])

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
        <div className="task-list-container">
            <h2>Task List</h2>
            <p>This is where all the tasks are shown.</p>

            <ul>
                {taskItems.map((task) => (
                    <li key={task.id} className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
                        <span className="task-title">{task.title}</span> |
                        <Link to={`/tasks/${task.id}`}>View Details</Link> |
                        <label htmlFor={`taskItem${task.id}`}>Completed</label>
                        <input 
                            type="checkbox"
                            id={`taskItem${task.id}`}
                            name={`taskItem${task.id}`}
                            checked={task.isCompleted}
                            onChange={() => handleCheckboxChange(task.id)}
                        /> |
                        <div class="editDeleteBtnsContainer">
                            <button type="button" class="editBtn">Edit</button>
                            <button type="button" class="deleteBtn">Delete</button>
                        </div>                      
                    </li>
                ))} 
            </ul>
        </div>
    );
}

export default TaskList;