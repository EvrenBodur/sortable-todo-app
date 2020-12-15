const listElement = document.querySelector(".list");
const submitBtn = document.querySelector(".submit");
const input = document.querySelector(".input");

class List {
  todoList = [];
  id = 0;
  drag = this.drag.bind(this);
  dragEnd = this.dragEnd.bind(this);
  btnHandler = this.btnHandler.bind(this);

  create(todo) {
    const item = document.createElement("div");
    item.className = "item";
    item.setAttribute("id", todo.id);
    item.draggable = true;
    item.ondrag = this.drag;
    item.ondragend = this.dragEnd;

    const dot = document.createElement("div");
    dot.className = todo.checked ? "dot dot-checked" : "dot";
    item.append(dot);

    const todoValue = document.createElement("div");
    todoValue.className = todo.checked ? "todo checked" : "todo";
    todoValue.innerText = todo.value;
    item.append(todoValue);

    const checkBtn = document.createElement("i");
    checkBtn.className = "check-icon fas fa-check";
    checkBtn.addEventListener("click", () => this.check(todo.id));
    item.append(checkBtn);

    const deleteBtn = document.createElement("i");
    deleteBtn.className = "delete-icon far fa-trash-alt";
    deleteBtn.addEventListener("click", () => this.delete(todo.id));
    item.append(deleteBtn);
    listElement.append(item);
  }

  add(todo) {
    this.todoList.push({
      id: this.id,
      value: todo,
      checked: false,
    });
    this.id++;
  }

  render() {
    listElement.innerHTML = "";
    const getTodos = this.todoList.map((todo) => {
      this.create(todo);
    });
    return getTodos;
  }

  check(id) {
    const newTodoList = this.todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          checked: !todo.checked,
        };
      } else {
        return todo;
      }
    });
    this.todoList = newTodoList;
    this.render();
  }

  delete(id) {
    const newTodoList = this.todoList.filter((todo) => todo.id !== id);
    this.todoList = newTodoList;
    this.render();
  }

  drag(e) {
    const selectedItem = e.target,
      list = selectedItem.parentNode,
      x = e.clientX,
      y = e.clientY;

    selectedItem.classList.add("active");
    let swapItem =
      document.elementFromPoint(x, y) === null
        ? selectedItem
        : document.elementFromPoint(x, y);

    if (list === swapItem.parentNode) {
      swapItem =
        swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
      list.insertBefore(selectedItem, swapItem);
    }
  }

  dragEnd(e) {
    e.target.classList.remove("active");
    const items = document.querySelectorAll(".item");
    const currentList = this.todoList;
    this.todoList = [];
    items.forEach((element) => {
      let orderItem = currentList.find((item) => item.id == element.id);
      this.todoList.push(orderItem);
    });
    this.render();
  }

  btnHandler(e) {
    e.preventDefault();
    if (input.value === "") return;
    this.add(input.value);
    this.render();
    input.value = "";
  }

  onload() {
    submitBtn.addEventListener("click", this.btnHandler);
  }
}

const list = new List();
list.onload();
