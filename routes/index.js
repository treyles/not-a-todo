const router = require('express').Router();
const Todo = require('../models/todo');

// GET todos
router.get('/', (req, res) => {
  Todo.find({})
    .then(results => {
      res.render('index', {
        todos: results
      });
    })
    .catch(err => console.log(err));
});

// NEW todo
router.post('/todos', (req, res) => {
  // if (!req.body.description.length) {
  //   res.redirect('/');
  //   return;
  // }

  let newTodo = new Todo({
    description: req.body.description
  });

  newTodo
    .save()
    .then(result => {
      // console.log(result);
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/');
    });
});

// DELETE todo
router.delete('/todos/:id', (req, res) => {
  const todoId = req.params.id;

  Todo.findByIdAndRemove(todoId)
    .then(result => {
      res.send(result);
    })
    .catch(err => console.log(err));
});

// DELETE completed
// router.delete('/completed', (req, res) => {
//   Todo.deleteMany({
//     done: true
//   })
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// UPDATE todo
router.put('/todos/update/:id', (req, res) => {
  const todoId = req.params.id;

  Todo.findById(todoId)
    .exec()
    .then(result => {
      result.done = !result.done;
      return result.save();
    })
    .then(response => {
      res.send(response);
    });
});

module.exports = router;
