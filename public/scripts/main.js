$(function() {
  let store = [];
  const ENTER_KEY = 13;

  Handlebars.registerPartial('todoPartial', $('#todo-partial').html());
  $('.date').html(moment().format('MMMM D'));
  $('.day').html(moment().format('dddd'));

  const app = {
    init() {
      model.fetchTodos();
      this.bindEvents();
    },

    bindEvents() {
      $('.container')
        .on('keypress', 'input', this.create.bind(this))
        .on('click', '.delete-btn', this.delete.bind(this))
        .on('click', '.completed-btn', this.complete.bind(this));
    },

    create(e) {
      $target = $(e.target);

      if (e.keyCode === ENTER_KEY) {
        model.createTodo({
          description: $target.val()
        });

        $target.val('');
      }
    },

    delete(e) {
      $target = $(e.target);
      const todo = $target.closest('li');
      model.deleteTodo(todo);
    },

    complete(e) {
      $target = $(e.target);
      const todo = $target.closest('li');
      model.completeTodo(todo);
    }
  };

  const model = {
    fetchTodos() {
      $.ajax({
        url: '/api/todos',
        type: 'GET',
        success: function(response) {
          store = response;
          view.renderAllTodos();
        },
        error: console.error
      });
    },

    createTodo(value) {
      $.ajax({
        url: '/api/todos',
        type: 'POST',
        data: value,
        success: this.onSuccess.bind(this),
        error: console.error
      });
    },

    deleteTodo(todo) {
      const id = todo.attr('data-id');

      $.ajax({
        url: `/api/todos/${id}`,
        type: 'DELETE',
        success: this.onSuccess.bind(this),
        error: console.error
      });
    },

    completeTodo(todo) {
      const id = todo.attr('data-id');

      $.ajax({
        url: `/api/todos/${id}`,
        type: 'PUT',
        success: this.onSuccess.bind(this),
        error: console.error
      });
    },

    onSuccess() {
      this.fetchTodos();
    }
  };

  const view = {
    todosTemplate: Handlebars.compile($('#todos-template').html()),
    completedTemplate: Handlebars.compile($('#completed-template').html()),

    renderAllTodos() {
      $todos = $('#todos');
      $todosCompleted = $('#todos-completed');

      // separate complete/incomplete todos
      const filteredTodos = store.filter(todo => !todo.done);
      const filteredCompleted = store.filter(todo => todo.done);

      // pass arrays into templates
      const todosList = this.todosTemplate({ filteredTodos });
      const completedList = this.completedTemplate({ filteredCompleted });

      // inject into the DOM
      $todos.html(todosList);
      $todosCompleted.html(completedList);
    }
  };

  app.init();
});
