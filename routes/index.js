const router = require('express').Router();
const Todo = require('../models/todo');

router.get('/', (req, res) => {
  Todo.find({})
    .then(results => {
      res.render('index', {
        todos: results.reverse()
      });
    })
    .catch(err => console.log(err));
});

router.post('/todos', (req, res) => {
  let newTodo = new Todo({
    description: req.body.description
  });

  newTodo
    .save()
    .then(result => {
      console.log(result);
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/');
    });
});

router.post('/todos/:id', (req, res) => {
  console.log(req.params.id);
  const todoId = req.params.id;

  Todo.findByIdAndRemove(todoId)
    .then(result => {
      console.log(result);
      res.redirect('/');
    })
    .catch(err => console.log(err));
});

module.exports = router;
