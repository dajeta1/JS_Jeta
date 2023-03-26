import Todo from './Model.js';
import DataService from './DataService.js';

// HTML Elements
const inputId = document.getElementById("inputId");
const inputTitle = document.getElementById("inputTitle");
const inputDueDate = document.getElementById("inputDueDate");
const inputDescription = document.getElementById("inputDescription");
const doForm = document.getElementById("doForm");
const tableBodyList = document.getElementById("tableBodyList");

// EventListener
document.getElementById("btnToggleAdd").addEventListener("click", (e) => {
    e.target.classList.toggle("btn-success");
    e.target.classList.toggle("btn-outline-primary");

    doForm.classList.toggle("d-none");
});

document.getElementById("btnSave").addEventListener("click", () => {
    const newTodo = new Todo(inputTitle.value, inputDueDate.value, inputDescription.value);

    if (inputId.value == "") {

        // add to data
        const insertedTodo = dataService.createTodo(newTodo);
        // add to UI
        renderTodoTableRow(insertedTodo);
    } else {
        newTodo.id = parseInt(inputId.value);
        dataService.updateTodo(newTodo);
        // render all Todos
        renderTodoTable(dataService.todos);
    }
    document.querySelector("#doForm form").reset();
    document.getElementById("btnToggleAdd").click();
});
// data
const dataService = new DataService();
dataService.getTodos();
// UI functions
renderTodoTable(dataService.todos);

function renderTodoTable(todoList) {
    tableBodyList.innerHTML = "";
    todoList.forEach(element => {
        renderTodoTableRow(element)
    });
}


function renderTodoTableRow(todo) {
    const tr = document.createElement("tr");
    tr.id = `tr-${todo.id}`;

    // create toggleDone button
    const tdDone = document.createElement("td");
    const btnToggleDone = document.createElement("button");
    btnToggleDone.innerText = todo.done ? "✅" : "🔘"
    btnToggleDone.addEventListener("click", (e) => {
        todo.done = !todo.done;
        dataService.updateTodo(todo); // handle data
        e.target.innerText = todo.done ? "✅" : "🔘"; // handle UI
    });
    tdDone.appendChild(btnToggleDone);

    // create Edit button
    const btnEdit = document.createElement("button");
    btnEdit.classList.add("btn", "btn-outline-warning");
    btnEdit.innerHTML = '<i class="fa-solid fa-pencil"></i>';
    btnEdit.addEventListener("click", () => {
        doForm.classList.remove("d-none");
        inputId.value = todo.id;
        inputTitle.value = todo.title;
        inputDueDate.value = todo.dueDate;
        inputDescription.value = todo.description;
    });
    const tdEdit = document.createElement("td");
    tdEdit.append(btnEdit);

    // create Delete button
    const btnDelete = document.createElement("button");
    btnDelete.classList.add("btn", "btn-outline-danger");
    btnDelete.innerText = "❌";
    btnDelete.addEventListener("click", () => {
        dataService.deleteTodo(todo.id); // handle data
        document.getElementById(`tr-${todo.id}`).remove(); // handle UI
    });
    const tdDelete = document.createElement("td");
    tdDelete.append(btnDelete);

    tr.append(
        createTableTd(todo.id),
        tdDone, //createTableTd(btnToggleDone.outerHTML),
        createTableTd(todo.title),
        createTableTd(todo.dueDate),
        createTableTd(todo.description),
        tdEdit,
        tdDelete,
    );

    tableBodyList.appendChild(tr);
}

function createTableTd(innerText) {
    const td = document.createElement("td");
    td.innerHTML = innerText;
    return td;
}