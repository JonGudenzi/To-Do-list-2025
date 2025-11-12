const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

const todos = [];

todoForm.addEventListener("submit", handleSubmit);

// handle form submit (read input, validate, add)
function handleSubmit(event) {
  event.preventDefault();
  const inputValue = todoInput.value.trim();
  if (inputValue === "") {
    return;
  } 
  todos.push(inputValue);
  renderSingleTodo(inputValue);
  saveTodos();
}

// add a new todo to our data (state)
// function addTodo(text) { ... }

// render all todos to the page
function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach(function(todoText){
        renderSingleTodo(todoText);
    })
}

// Rendering UI
function renderSingleTodo(text) {
    const li = document.createElement("li");
    li.textContent = text;
    todoList.appendChild(li);
    todoInput.value = "";
    todoInput.focus();
}

// save todos to localStorage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

todoList.addEventListener("click", function(event){
    const clickedItem = event.target;
    if(clickedItem.tagName === "LI"){
        clickedItem.classList.toggle("completed");
    }
})

// load todos from localStorage on startup
function loadTodos() {
  const saved = localStorage.getItem("todos")
if (saved) {
    const parsed = JSON.parse(saved);
    todos.push(...parsed);
    renderTodos();
}
}
loadTodos();

// handle clicks on the list (complete/delete)
// function handleListClick(event) { ... }
