import { useState } from 'react';
import '../TaskCreate.css';

function TaskCreate({onTaskCreated}) {

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        // Directly reset form fields
        event.target.querySelector('input[name="taskTitle"]').value = '';
        event.target.querySelector('textarea[name="taskDescription"]').value = '';

        // handle the form submission
        fetch("https://localhost:7130/api/Tasks/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                title: taskTitle,
                description: taskDescription
            })
        })
        .then(response => {

            if (!response.ok) {
                throw new Error('Error creating task');
            }
            return response.json();
        })
        .then((newTask) =>{
            onTaskCreated(newTask); // Update the list in parent component
            setTaskTitle("");
            setTaskDescription("");
        })
        .catch(error => console.error('Error creating task:', error));
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <p><label>Task title: 
                    <input type="text" name="taskTitle" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}/>
                    </label></p>
            <p><label>Task description:
                <textarea name="taskDescription" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}/>
            </label></p>
            <p id="createTaskBtn"><button type="submit">Create Task</button></p>
            
            </div>
           
        </form>
    )
}
export default TaskCreate;
