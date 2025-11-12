const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

todoForm.addEventListener("submit", handleSubmit);

// handle form submit (read input, validate, add)
function handleSubmit(event) {
  event.preventDefault();
  const inputValue = todoInput.value.trim();
  if (inputValue === "") {
    return;
  } 
  renderSingleTodo(inputValue);
}

// add a new todo to our data (state)
// function addTodo(text) { ... }

// render all todos to the page
// function renderTodos() { ... }

function renderSingleTodo(text) {
    const li = document.createElement("li");
    li.textContent = text;
    todoList.appendChild(li);
    todoInput.value = "";
    todoInput.focus();
}

// save todos to localStorage
// function saveTodos() { ... }

// load todos from localStorage on startup
// function loadTodos() { ... }

// handle clicks on the list (complete/delete)
// function handleListClick(event) { ... }
