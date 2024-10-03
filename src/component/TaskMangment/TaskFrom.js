import React, { useEffect, useState } from "react";

const TaskForm = ({
  addTask,
  editingTask,
  updateTask,
  showModal,
  setShowModal,
}) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    completed: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    } else {
      setTask({
        title: "",
        description: "",
        dueDate: "",
        completed: false,
      });
    }
  }, [editingTask]);

  const validateForm = () => {
    const newErrors = {};
    if (!task.title) newErrors.title = "Title is required.";
    if (!task.description) newErrors.description = "Description is required.";
    if (!task.dueDate) newErrors.dueDate = "Due date is required.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({}); 

    if (!validateForm()) {
      return;
    }

    if (editingTask) {
      updateTask(task);
    } else {
      const success = addTask(task); 

      if (!success) {
        setErrors({ general: "Failed to add task. Please try again." });
      }
    }

    setTask({
      title: "",
      description: "",
      dueDate: "",
      completed: false,
    });
    setShowModal(false);
  };

  return (
    <>
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="taskModalLabel"
        aria-hidden={!showModal}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between">
              <h5 className="modal-title" id="taskModalLabel">
                {editingTask ? "Edit Task" : "Add Task"}
              </h5>
              <button
                type="button"
                className="close-modal"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {errors.general && (
                <div className="alert alert-danger">{errors.general}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="taskTitle" className="mb-2">Task Title</label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? "is-invalid" : ""}`}
                    id="taskTitle"
                    placeholder="Enter task title"
                    value={task.title}
                    onChange={(e) =>
                      setTask({ ...task, title: e.target.value })
                    }
                  />
                  {errors.title && (
                    <div className="invalid-feedback">{errors.title}</div>
                  )}
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="taskDescription" className="mb-2">Task Description</label>
                  <textarea
                    className={`form-control ${errors.description ? "is-invalid" : ""}`}
                    id="taskDescription"
                    placeholder="Enter task description"
                    value={task.description}
                    onChange={(e) =>
                      setTask({ ...task, description: e.target.value })
                    }
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="taskDueDate" className="mb-2">Due Date</label>
                  <input
                    type="date"
                    className={`form-control ${errors.dueDate ? "is-invalid" : ""}`}
                    id="taskDueDate"
                    value={task.dueDate}
                    onChange={(e) =>
                      setTask({ ...task, dueDate: e.target.value })
                    }
                  />
                  {errors.dueDate && (
                    <div className="invalid-feedback">{errors.dueDate}</div>
                  )}
                </div>
                <div className="form-group mt-2">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="taskCompleted"
                      checked={task.completed}
                      onChange={(e) =>
                        setTask({ ...task, completed: e.target.checked })
                      }
                    />
                    <label className="form-check-label" htmlFor="taskCompleted">
                      Mark as completed
                    </label>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  {editingTask ? "Update Task" : "Add Task"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show" />}
    </>
  );
};

export default TaskForm;
