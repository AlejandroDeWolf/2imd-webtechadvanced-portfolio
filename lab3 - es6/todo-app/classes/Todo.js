export default class Todo {
  constructor(title, done = false) {
    this.title = title;
    this.done = done;
  }

  createElement() {
    let li = document.createElement("li");

    if (this.title.startsWith("high:")) {
      li.classList.add("prior-high");
      this.title = this.title.replace("high:", "");
    }
    else if (this.title.startsWith("medium:")) {
      li.classList.add("prior-medium");
      this.title = this.title.replace("medium:", "");
    }
    else if (this.title.startsWith("low:")) {
      li.classList.add("prior-low");
      this.title = this.title.replace("low:", "");
    }
    else {
      li.classList.add("prior-medium");
      this.title = this.title.replace("medium:", "");
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
