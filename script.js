// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
// Functions

// Adding a todo inside of the container

const addTodo = function (e) {
  e.preventDefault();

  todoList.insertAdjacentHTML(
    "beforeend",
    `<div class="todo">
  <li class="todo-item">${todoInput.value}</li>
  <button class="complete-btn btn"><i class="fas fa-check"></i></button>
  <button class="trash-btn btn"><i class="fas fa-trash"></i></button>
  </div>`
  );
  // Clear todo input value
  saveLocalTodos(todoInput.value);
  todoInput.value = "";
};

// Delete  the "todo"
const deleteItem = function (e) {
  const clicked = e.target.closest(".btn");

  if (!clicked) return;

  if (clicked.classList.contains("trash-btn")) {
    const todo = e.target.closest(".todo");

    todo.classList.add("fall");
    deleteLocalTodos(todo);
    todo.addEventListener("animationend", function () {
      todo.remove();
    });
  }
};

// Check the todo
const checkedItem = function (e) {
  const clicked = e.target.closest(".btn");

  if (!clicked) return;

  if (clicked.classList.contains("complete-btn")) {
    const todo = e.target.closest(".todo");
    todo.classList.toggle("completed");
  }
};

//filter

const filterTodo = function (e) {
  const todos = todoList.childNodes;
  todos.forEach(todo => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "active": {
        if (!todo.classList.contains("completed")) todo.style.display = "flex";
        else todo.style.display = "none";
      }
    }
  });
};

// Save local todos

const saveLocalTodos = function (todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Display local Todo

const getLocalTodos = function (todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(todo => {
    todoList.insertAdjacentHTML(
      "beforeend",
      `<div class="todo">
    <li class="todo-item">${todo}</li>
    <button class="complete-btn btn"><i class="fas fa-check"></i></button>
    <button class="trash-btn btn"><i class="fas fa-trash"></i></button>
    </div>`
    );
  });
};

const deleteLocalTodos = function (todo) {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todos.indexOf(todo.children[0].innerText);

  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Event Listeners

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteItem);
todoList.addEventListener("click", checkedItem);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getLocalTodos);
