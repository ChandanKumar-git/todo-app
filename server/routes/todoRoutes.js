const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');

// GET all todos
router.get('/', getTodos);

// Add a new todo
router.post('/', [
  check('name', 'Name is required').not().isEmpty()
], createTodo);

// Update a todo
router.put('/:id', updateTodo);

// Delete a todo
router.delete('/:id', deleteTodo);

module.exports = router;
