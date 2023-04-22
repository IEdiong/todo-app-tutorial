import Sortable from '@shopify/draggable/lib/sortable';

const todoList = document.getElementById('todo-list');
const sortable = new Sortable(todoList, {
  draggable: 'li',
  animation: 300,
});

console.log('drag-n-drop');
