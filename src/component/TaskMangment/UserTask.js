import React, { useEffect, useState } from "react";
import TaskForm from "./TaskFrom"; 
import TaskList from "./TaskList";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserTask() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tasks");
      setTasks(response.data);
    } catch (error) {
      toast.error("Error fetching tasks. Please try again.");
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post("http://localhost:3000/tasks", task);
      setTasks([...tasks, response.data]);
      setShowModal(false);
      toast.success("Task added successfully!");
    } catch (error) {
      toast.error("Error adding task. Please try again.");
    }
  };

  const updateTask = async (task) => {
    try {
      const response = await axios.put(`http://localhost:3000/tasks/${task.id}`, task);
      setTasks(tasks.map((taskdata) => (taskdata.id === task.id ? response.data : taskdata)));
      setEditingTask(null);
      setShowModal(false);
      toast.success("Task updated successfully!");
    } catch (error) {
      toast.error("Error updating task. Please try again.");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Error deleting task. Please try again.");
    }
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    const newCompletedStatus = !tasks.find(task => task.id === taskId).completed;
    axios.patch(`http://localhost:3000/tasks/${taskId}`, {
      completed: newCompletedStatus,
    })
    .then(response => {
      console.log('Task updated:', response.data);
    })
    .catch(error => {
      console.error('Error updating task:', error);
    });
  };
  
  

  const handleOpenModal = () => {
    setEditingTask(null);
    setShowModal(true);
    setTimeout(() => {
      toast.dismiss();
    }, 0);
  };

  const editData = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h1 className="text-center mb-4">Task Manager</h1>
      <button className="btn btn-primary mb-4" onClick={handleOpenModal}>
        Add Task
      </button>

      <TaskForm
        addTask={addTask}
        updateTask={updateTask}
        showModal={showModal}
        setShowModal={setShowModal}
        editingTask={editingTask} 
      />

      <TaskList
        tasks={tasks}
        handleditTask={editData} 
        handleDeleteTask={handleDeleteTask}
        handleToggleComplete={handleToggleComplete}
      />
    </div>
  );
}
