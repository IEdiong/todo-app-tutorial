'use strict';

// App State
let todoId = 0;

// Step 01: Grab elements
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const form = document.getElementById('todo-form');
const clearBtn = document.getElementById('clear-completed');
const all = document.getElementById('all');
const completed = document.getElementById('completed');
const active = document.getElementById('active');

// Step 02: Add event listeners
window.addEventListener('DOMContentLoaded', getLocalTodos);
form.addEventListener('submit', addTodo);
todoList.addEventListener('click', checkDelete);
clearBtn.addEventListener('click', clearCompleted);
all.addEventListener('change', displayAll);
completed.addEventListener('change', displayCompleted);
active.addEventListener('change', displayActive);

// Step 03: Create callback functions

// Add Items
function addTodo(e) {
  const item = todoInput.value;
  e.preventDefault();
  if (item) {
    renderTodos(item, false);
    saveLocalTodos(item);
    renderItemsLeft();
    todoInput.value = '';
  }
}

// Mark as complete or delete
function checkDelete(e) {
  const elClicked = e.target;

  // Delete Todos
  if (elClicked.id === 'del') {
    const todoElement = elClicked.parentElement.children[1];
    removeLocalTodo(todoElement);
    elClicked.parentElement.remove();
  }

  // Check Todos
  if (elClicked.id.startsWith('checkbox-')) {
    elClicked.parentElement.classList.toggle('completed');
    const label = elClicked.parentElement.children[1];

    // Localstorage update
    const todoText = label.textContent;
    const todos = JSON.parse(localStorage.getItem('todos'));

    const idx = todos.findIndex((todo) => todo.note === todoText);
    todos[idx].completed = !todos[idx].completed;
    localStorage.setItem('todos', JSON.stringify(todos));

    // UI update
    label.classList.toggle('line-through');
    label.classList.toggle('text-dark-gray-50');
    renderItemsLeft();
  }
}

// Save to localstorage
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    // Does not exist => create an empty one
    todos = [];
  } else {
    // Get them
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  // // Add new todo
  // todos.push(todo);

  // // Save to Localstorage
  // localStorage.setItem('todos', JSON.stringify(todos));

  //////////////////////////////////////////////////////////////

  // Add new todo
  todos.push({
    note: todo,
    completed: false,
  });

  // Save to Localstorage
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Get items from localstorage
function getLocalTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    // Does not exist => create an empty one
    todos = [];
  } else {
    // Get them
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(({ note, completed }) => {
    renderTodos(note, completed);
  });

  renderItemsLeft();

  //////////////////////////////////////////////////////////////
  // This is not working for some reason
  // const todoEl = document.querySelectorAll('li[data-todo-item]');
  // const arr = [];

  // todoEl.forEach((el) => {
  //   arr.push({
  //     note: el.children[1].textContent,
  //     completed: false,
  //   });
  // });
}

// Remove from local todos
function removeLocalTodo(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    // Does not exist => create an empty one
    todos = [];
  } else {
    // Get them
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const todoText = todo.textContent;

  todos = todos.filter((todo) => todo.note !== todoText);
  // todos.splice(todos.indexOf(todoText), 1);

  // Save to Localstorage
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Render todo element to the DOM
function renderTodos(note, completed) {
  const html = `
        <li class="todo group px-3 md:px-6 py-4 w-full flex items-center gap-x-2 md:gap-x-6 text-dark-gray-100 dark:text-light-grayish-blue" data-todo-item >
        <!-- TODO: fix the focus state -->
        <input
          type="checkbox"
          id="checkbox-${todoId}"
          ${completed ? 'checked' : ''}
          class="peer appearance-none relative mx-[2px] my-[2px] w-5 h-5 rounded-full focus:outline-none shrink-0 before:content-[''] before:w-[22px] before:h-[22px] before:-left-[1px] before:-top-[1px] before:bg-check-gray checked:before:bg-gradient-to-br hover:before:bg-gradient-to-br checked:before:from-check-start checked:before:to-check-end hover:from-check-start hover:to-check-end before:absolute before:rounded-full after:content-[''] after:w-full after:h-full after:left-0 after:top-0 after:bg-white dark:after:bg-desat-blue checked:after:bg-center checked:after:bg-no-repeat checked:after:bg-transparent dark:checked:after:bg-transparent  checked:after:bg-[url('/images/icon-check.svg')] after:absolute after:rounded-full cursor-pointer ease-in transition-all"
        />
        <label for="checkbox-${todoId}" class="w-full md:cursor-pointer ${completed ? 'line-through text-dark-gray-50 dark:text-dark-grayish-blue' : ''}">${note}</label>
        <button id="del" class="bg-transparent md:opacity-0 group-hover:opacity-100">
          <img class="pointer-events-none" src="/images/icon-cross.svg" alt="" />
        </button>
      </li>
        `;

  todoList.insertAdjacentHTML('afterbegin', html);
  todoId++;
}

// Render number of items left
function renderItemsLeft() {
  if (localStorage.getItem('todos')) {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const itemsLeft = todos.filter((todo) => todo.completed === false).length;
    document.getElementById('items-left').children[0].textContent = itemsLeft;
  } else {
    document.getElementById('items-left').children[0].textContent = 0;
  }
}

// Clear completed
function clearCompleted() {
  // Clear completed todos from localstorage
  let todos = JSON.parse(localStorage.getItem('todos'));
  todos = todos.filter((todo) => todo.completed !== true);
  localStorage.setItem('todos', JSON.stringify(todos));

  // Remove elements from the DOM
  document.querySelectorAll('li[data-todo-item]').forEach((el) => {
    el.remove();
  });

  // Update UI
  todos.forEach(({ note, completed }) => {
    renderTodos(note, completed);
  });
}

// Show All
function displayAll() {
  // Get completed todos from localstorage
  let todos = JSON.parse(localStorage.getItem('todos'));

  // Remove elements from the DOM
  document.querySelectorAll('li[data-todo-item]').forEach((el) => {
    el.remove();
  });

  // Update UI
  todos.forEach(({ note, completed }) => {
    renderTodos(note, completed);
  });
}

// Show completed
function displayCompleted() {
  // Get completed todos from localstorage
  let todos = JSON.parse(localStorage.getItem('todos'));
  todos = todos.filter((todo) => todo.completed !== false);

  // Remove elements from the DOM
  document.querySelectorAll('li[data-todo-item]').forEach((el) => {
    el.remove();
  });

  // Update UI
  todos.forEach(({ note, completed }) => {
    renderTodos(note, completed);
  });
}

// Show Active
function displayActive() {
  // Get completed todos from localstorage
  let todos = JSON.parse(localStorage.getItem('todos'));
  todos = todos.filter((todo) => todo.completed !== true);

  // Remove elements from the DOM
  document.querySelectorAll('li[data-todo-item]').forEach((el) => {
    el.remove();
  });

  // Update UI
  todos.forEach(({ note, completed }) => {
    renderTodos(note, completed);
  });
}
