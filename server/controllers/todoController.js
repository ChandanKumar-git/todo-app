const Todo = require('../models/Todo');
const { validationResult } = require('express-validator');

// GET all todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a new todo
const createTodo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, description } = req.body;
    const todo = new Todo({ name, description });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ msg: 'Todo not found' });

    todo.name = req.body.name || todo.name;
    todo.description = req.body.description || todo.description;
    todo.completed = req.body.completed || todo.completed;
    
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// For delete Todo
const mongoose = require('mongoose');

const deleteTodo = async (req, res) => {
  try {
    //Here we are validating the ID parameter
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Todo ID' });
    }

    
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }

    res.json({ msg: 'Todo removed successfully' });
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};


module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
