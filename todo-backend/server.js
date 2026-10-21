require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const taskRoutes = require('./routes/taskRoutes')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send('To-Do API is running'))
app.use('/api/tasks', taskRoutes)

app.use((req, res) => res.status(404).json({ error: 'Route not found' }))
app.use(errorHandler)

const PORT = process.env.PORT || 5000

connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => {
    console.error('Database connection failed:', err.message)
    process.exit(1)
  })