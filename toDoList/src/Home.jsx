import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from 'axios';
import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill } from 'react-icons/bs';

function Home() {

  const [todos, setTodos] = useState([]);

  // Fetch todos from server
  useEffect(() => {
    axios.get("http://localhost:3001/get")
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  // Toggle task's done state
  const handleEdit = (id, currentDoneStatus) => {
    const updatedDoneStatus = !currentDoneStatus;
    axios.put(`http://localhost:3001/update/${id}`, { done: updatedDoneStatus })
      .then(result => {
        // Update the todo in state
        setTodos(todos.map(todo => 
          todo._id === id ? { ...todo, done: updatedDoneStatus } : todo
        ));
        location.reload() 
      })
      .catch(err => console.log(err));
  };

  // Delete task
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(result => {
        // Remove the deleted task from state
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>To Do List</h1>
      <Create />

      {todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo, index) => (
          <div key={index} className="task">
            <div className="checkbox" onClick={() => handleEdit(todo._id, todo.done)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className = {todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span onClick={() => handleDelete(todo._id)}>
                <BsFillTrashFill className="icon" />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
