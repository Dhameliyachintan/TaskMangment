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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      updateTask(task);
    } else {
      addTask(task);
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
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="taskTitle" className="mb-2">Task Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="taskTitle"
                    placeholder="Enter task title"
                    value={task.title}
                    onChange={(e) =>
                      setTask({ ...task, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="taskDescription" className="mb-2">Task Description</label>
                  <textarea
                    className="form-control"
                    id="taskDescription"
                    placeholder="Enter task description"
                    value={task.description}
                    onChange={(e) =>
                      setTask({ ...task, description: e.target.value })
                    }
                    required
                  ></textarea>
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="taskDueDate" className="mb-2">Due Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="taskDueDate"
                    value={task.dueDate}
                    onChange={(e) =>
                      setTask({ ...task, dueDate: e.target.value })
                    }
                    required
                  />
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
