import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TaskDetails = () => {
    const { id } = useParams(); // Get the task id from the URL

    const [taskItemState, setTaskItemState] = useState(null);

    useEffect(() => {
        fetch(`https://localhost:7130/api/Tasks/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch task ${id} details`)
            }
            return response.json();
        })
        .then(data => setTaskItemState(data))
        .catch(error => console.error("Fetch error:", error));
    }, [id])

    if (taskItemState === null) {
        return <p>Loading task details...</p>
    }

    return (
        <div>
            <h2>Task Details for Task {id}</h2>
            <p>Here you will see details for task with id: {id}</p>
            <div>
                <p><strong>Title:</strong> {taskItemState.title}</p>
                <p><strong>Description:</strong> {taskItemState.description}</p>
                <p><strong>Completed:</strong> {taskItemState.isCompleted ? "Yes" : "No"}</p>
                <p><strong>Created At:</strong> {taskItemState.createdAt}</p>
            </div>
        </div>
    );
}
export default TaskDetails;