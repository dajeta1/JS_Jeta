import { mockData } from "./Model.js";

export default class DataService {
    todos;
    constructor() {
        this.todos = [];
    }
    getTodos() {
        this.todos = [...mockData];
    }
    createTodo(todo) {
        const newId = this.todos[this.todos.length - 1].id + 1; // create new id, from last inserted id
        todo.id = newId;
        this.todos.push(todo);
        return todo;
    }
    updateTodo(todo) {
        this.todos = this.todos.map(element => element.id === todo.id ? todo : element);
        console.table(this.todos);
    }
    deleteTodo(id) {
        // array.filter
        this.todos = this.todos.filter(element => element.id !== id);
    }
} 