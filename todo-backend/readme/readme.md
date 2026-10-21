# To-Do List Backend (Part 1)

REST API for a To-Do List app built with Node.js, Express.js and MongoDB (Mongoose).

## Endpoints
- POST /api/tasks: add a task
- GET /api/tasks: get all tasks (optional ?search= and ?completed=true/false)
- GET /api/tasks/:id: get one task
- PUT /api/tasks/:id: update a task
- PATCH /api/tasks/:id/complete: mark complete or pending
- DELETE /api/tasks/:id: delete a task
- DELETE /api/tasks/completed: delete all completed tasks

## Structure
- routes: URLs and validation
- controllers: handle requests and responses
- services: database logic
- models: Mongoose schema
- middleware: validation and error handling

## Setup
1. npm install
2. Create a .env file:
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
3. npm run dev

## Challenges and Solutions
- Route order: DELETE /completed had to be placed before /:id, otherwise "completed" was read as an id.
- Invalid ids crashed Mongoose, so I validate ids and return 400.
- Atlas blocked the connection until I allowed access from all IPs.
- Search text is escaped so special characters cannot break the regex.

