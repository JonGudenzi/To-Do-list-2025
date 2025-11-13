const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

// STATE (objects, not strings)
const todos = [];

// === SUBMIT HANDLER ===
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = todoInput.value.trim();
  if (text === "") return;

  todos.push({ text: text, done: false });   // OBJECT
  saveTodos();
  renderTodos();

  todoInput.value = "";
  todoInput.focus();
});

// === RENDER ALL TODOS ===
function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach(function (todo, index) {
    renderSingleTodo(todo, index);
  });
}

// === RENDER ONE TODO ===
function renderSingleTodo(todo, index) {
  const li = document.createElement("li");
  li.textContent = todo.text;

  // store the index in the DOM
  li.dataset.index = index;

  // apply completed CSS if needed
  if (todo.done) {
    li.classList.add("completed");
  }

  // delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.classList.add("delete-btn");

  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

// === SAVE ===
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// === LOAD ON STARTUP ===
function loadTodos() {
  const saved = localStorage.getItem("todos");
  if (!saved) return;

  const parsed = JSON.parse(saved);

  // copy objects into the todos array
  parsed.forEach(t => todos.push(t));

  renderTodos();
}
loadTodos();

// === CLICK TO COMPLETE OR DELETE ===
todoList.addEventListener("click", function (event) {
  const item = event.target;

  // DELETE
  if (item.classList.contains("delete-btn")) {
    const li = item.closest("li");
    const index = Number(li.dataset.index);

    todos.splice(index, 1);
    saveTodos();
    renderTodos();
    return;
  }

  // COMPLETE
  if (item.tagName === "LI") {
    const index = Number(item.dataset.index);

    todos[index].done = !todos[index].done;     // flip boolean
    saveTodos();
    renderTodos();
  }
});
