import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './component/navbar/Navbar';
import { useState } from 'react';
import Registration from './component/form/Registration';
import Login from './component/form/Login';
import UserTask from './component/TaskMangment/UserTask';
import { toast, ToastContainer } from 'react-toastify';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  return (
    <div className="App">
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Registration setIsLoggedIn={setIsLoggedIn} setMessage={setMessage} />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/userTask" element={<UserTask />} />
      </Routes>
    </div>
  );
}

export default App;