export default class Todo {
    id;
    title;
    dueDate;
    description;
    done;
    constructor(title, dueDate = "", description = "", done = false, id = null) {
        this.id = id;
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.done = done;
    }
}
export const mockData = [
    new Todo("Attend JS course", "2022-06-06", "", true, 1),
    new Todo("Buy bread", "2022-06-07", "No white bread please.", false, 2),
    new Todo("Clean kitchen", "2022-06-08", "For real this time ;-)", false, 3),
    new Todo("Workout", "2022-06-09", "Run in park.", false, 4),
];
