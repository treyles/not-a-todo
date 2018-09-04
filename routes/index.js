const router = require('express').Router();
var path = require('path');
const Todo = require('../models/todo');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../views/index.html'));
});

// fetch all todos
router.get('/api/todos', (req, res) => {
  Todo.find({})
    .then(results => res.json(results))
    .catch(() => res.sendStatus(500));
});

// add new todo
router.post('/api/todos', (req, res) => {
  const newTodo = new Todo({
    description: req.body.description
  });

  newTodo
    .save()
    .then(result => res.json(result))
    .catch(() => res.sendStatus(500));
});

// delete todo
router.delete('/api/todos/:id', (req, res) => {
  const todoId = req.params.id;

  Todo.findByIdAndRemove(todoId)
    .then(result => res.json(result))
    .catch(() => res.sendStatus(500));
});

// update completed status
router.put('/api/todos/:id', (req, res) => {
  const todoId = req.params.id;

  Todo.findById(todoId)
    .exec()
    .then(result => {
      result.done = !result.done;
      return result.save();
    })
    .then(response => res.json(response))
    .catch(() => res.sendStatus(500));
});

module.exports = router;
