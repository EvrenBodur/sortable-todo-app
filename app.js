const listElement = document.querySelector(".list");
const submitBtn = document.querySelector(".submit");
const input = document.querySelector(".input");

class List {
  todoList = [];
  id = 0;

  create(todo) {
    const item = document.createElement("div");
    item.className = "item";

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

  get() {
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
    this.get();
  }

  delete(id) {
    const newTodoList = this.todoList.filter((todo) => todo.id !== id);
    this.todoList = newTodoList;
    this.get();
  }
}

const list = new List();

const addTodos = (e) => {
  e.preventDefault();

  if (input.value === "") return;
  list.add(input.value);
  list.get();
  input.value = "";
};

submitBtn.addEventListener("click", addTodos);
