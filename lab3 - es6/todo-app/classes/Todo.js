export default class Todo {
  constructor(title, done = false) {
    this.title = title;
    this.done = done;
  }

  createElement() {
    let li = document.createElement("li");

    if (this.title.startsWith("low:")) {
      li.classList.add("prior-low");
      li.innerHTML = this.title.slice(4);
    }
    else if (this.title.startsWith("high:")) {
      li.classList.add("prior-high");
      li.innerHTML = this.title.slice(5);
    }
    else if (this.title.startsWith("medium:")) {
      li.classList.add("prior-medium");
      li.innerHTML = this.title.slice(7);
    }
    else {
      li.classList.add("prior-medium");
      li.innerHTML = this.title;
    }

    li.prototype = this;
    li.addEventListener("click", this.markDone);
    li.innerHTML = this.title;

    if (this.done == true) {
      li.classList.add("done");
    }

    return li;
  }

  markDone() {
    if (this.classList.contains("done")) {
      this.remove();
      localStorage.removeItem(this.innerHTML);
      // console.log(this.innerHTML);
    }
    else {
      this.classList.add("done");
      this.prototype.done = true;
      this.prototype.saveToStorage();
    }
  }

  add() {
    let todo = this.createElement();
    document.querySelector("#todo-list").appendChild(todo);
  }

  saveToStorage() {
    // HINT🤩
    // localStorage only supports strings, not arrays
    // if you want to store arrays, look at JSON.parse and JSON.stringify
    // localStorage.setItem(this.title, JSON.stringify(this));
    localStorage.setItem(this.title, JSON.stringify(this));
  }
}
