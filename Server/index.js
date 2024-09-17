const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ToDoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/test", { useNewUrlParser: true, useUnifiedTopology: true });

// Get all tasks
app.get('/get', (req, res) => {
  ToDoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// Add a new task
app.post('/add', (req, res) => {
  const task = req.body.task;
  ToDoModel.create({ task: task, done: false }) // default done status as false
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// Update a task (toggle done status)
app.put('/update/:id', (req, res) => {
  const { done } = req.body;
  ToDoModel.findByIdAndUpdate(req.params.id, { done: done }, { new: true })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// Delete a task
app.delete('/delete/:id', (req, res) => {
  ToDoModel.findByIdAndDelete(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
