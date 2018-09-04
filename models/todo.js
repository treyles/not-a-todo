const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
  description: {
    type: String
  },
  done: {
    type: Boolean,
    default: false
  }
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
