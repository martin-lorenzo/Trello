const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const tasksController = require('./controllers/taskController');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


const port = process.env.PORT || 3001;

// Connect to MongoDB database
const connectionString = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// API routes
app.get('/', (req, res) => {
  res.send('Trello clone API');
});

app.post('/tasks', tasksController.createTask);
app.get('/tasks', tasksController.getTasks);
app.put('/tasks/:id', tasksController.updateTask);
app.delete('/tasks/:id', tasksController.deleteTask);

// Start the server by listening on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
