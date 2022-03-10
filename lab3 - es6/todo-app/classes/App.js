import Todo from "./Todo";

export default class App {
  constructor() {
    this.setupEventListeners();
    this.loadFromStorage();
  }

  setupEventListeners() {
    document.querySelector("#add-item-text").addEventListener("keyup", this.createItem.bind(this));
  }

  createItem(e) {
    if (e.key === "Enter") {
      console.log("📕");
      let todoValue = document.querySelector("#add-item-text").value;
      let todo = new Todo(todoValue);
      todo.add();
      todo.saveToStorage();
      this.reset();
    }
  }

  loadFromStorage() {
    // HINT🤩
    // load all items from storage here and add them to the screen
    // use the Todo class to create the elements
    let keys = Object.keys(localStorage);

    for (let i = 0; i < keys.length; i++) {
      let storedTodo = JSON.parse(localStorage.getItem(keys[i]));
      let todo = new Todo(storedTodo.title, storedTodo.done);
      todo.add();
    }
  }

  reset() {
    document.querySelector("#add-item-text").value = "";
  }
}
