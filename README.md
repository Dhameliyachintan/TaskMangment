# Task Management Project
A simple and efficient task management application that allows users to create, manage, and track their tasks.

# Getting Started with Create React App
This project was TaskMangment with [https://github.com/Dhameliyachintan/TaskMangment.git).

# Install JSON Server globally
npm install -g json-server

# json server commond
json-server --watch db.json --port 4000

# Features
- **User Authentication**: Secure user login and registration use JWT.
- **Task Creation**: Easily create new tasks with titles, descriptions, and due dates.
- **Task Management**: Edit and delete tasks as needed.
- **Task Filtering**: Filter tasks by status (e.g., completed, pending).
- **Responsive Design**: Works well on both desktop and mobile devices.
- **Real-time Updates**: Tasks are updated in real time for all users. 

# API Endpoints
POST /api/tasks: Create a new task

GET /api/tasks: Retrieve all tasks

GET /api/tasks/:id: Retrieve a specific task by ID

PUT /api/tasks/:id: Update a specific task

DELETE /api/tasks/:id: Delete a specific task

# Install dependencies
npm install

# Running the Application
npm start
