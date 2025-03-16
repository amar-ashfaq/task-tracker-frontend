import React from 'react';
import { useParams } from 'react-router-dom';

const TaskDetails = () => {
    const { id } = useParams(); // Get the task id from the URL
    return (
        <div>
            <h2>Task Details for Task {id}</h2>
            <p>Here you will see details for task with id: {id}</p>
        </div>
    );
}
export default TaskDetails;