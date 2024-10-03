import React from 'react';

const TaskList = ({ tasks, handleEditTask, handleDeleteTask, handleToggleComplete }) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No tasks available</td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.dueDate}</td>
                <td>
                  <button
                    className={`btn btn-sm ${task.completed ? 'btn-success' : 'btn-secondary'}`}
                    onClick={() => handleToggleComplete(task.id)} 
                  >
                    {task.completed ? 'Completed' : 'Incomplete'}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-info btn-sm mx-3"
                    onClick={() => handleEditTask(task)} 
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
