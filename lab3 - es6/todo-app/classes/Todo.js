export default class Todo {
  constructor(title) {
    this.title = title;
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

    li.addEventListener("click", this.markDone);
    li.innerHTML = this.title;

    return li;
  }

  markDone(e) {
    if (this.classList.contains("done")) {
      this.remove();
      localStorage.removeItem(this.innerHTML);
      // console.log(this.innerHTML);
    }
    else {
      this.classList.add("done");
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
