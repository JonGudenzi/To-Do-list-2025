const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

const todos = [];

todoForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const inputValue = todoInput.value.trim();
  if (inputValue === "") {
    return;
  }

  // update state
  todos.push(inputValue);

  // save
  saveTodos();

  // update UI
  renderTodos();

  // clear input
  todoInput.value = "";
  todoInput.focus();
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach(function (todoText) {
    renderSingleTodo(todoText);
  });
}

function renderSingleTodo(text) {
  const li = document.createElement("li");
  li.textContent = text;
  todoList.appendChild(li);
}

// save todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// load todos from localStorage on startup
function loadTodos() {
  const saved = localStorage.getItem("todos");
  if (saved) {
    const parsed = JSON.parse(saved);
    todos.push(...parsed);
    renderTodos();
  }
}
loadTodos();

// click to complete
todoList.addEventListener("click", function (event) {
  const clickedItem = event.target;
  if (clickedItem.tagName === "LI") {
    clickedItem.classList.toggle("completed");
  }
});
