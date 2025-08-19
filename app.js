let newTask = document.querySelector("#new-task");
let listItems = document.querySelector(".list-items");
let clearAllBtn = document.querySelector(".clear-btn");
let addTask = document.querySelector(".add-task-btn");
let filterInput = document.querySelector("#filter-item");
let deleteTasks = document.querySelector(".delete-tasks-btn");
let tasksArray = [];

document.addEventListener("DOMContentLoaded", () => {
  renderItem();
  checkUi();
});
const createTask = (task) => {
  // create li element ...
  let li = document.createElement("li");
  li.classList = "list-group-item d-flex justify-content-between";
  listItems.appendChild(li);

  // create text span ...
  let textSpan = document.createElement("span");
  textSpan.textContent = task;
  li.appendChild(textSpan);

  // create delete-icon ...
  let deleteIcon = document.createElement("i");
  deleteIcon.classList = "bi bi-trash-fill";
  li.appendChild(deleteIcon);
};

const addItems = () => {
  if (!newTask.value.trim()) {
    return;
  }
  newItem = newTask.value;
  createTask(newItem);
  tasksArray.push(newItem);
  saveItem();
  newTask.value = "";
};

const checkUi = () => {
  const items = listItems.querySelectorAll("li");
  if (items.length === 0) {
    clearAllBtn.style.display = "none";
    filterInput.style.display = "none";
  } else {
    clearAllBtn.style.display = "block";
    filterInput.style.display = "block";
  }
};
addTask.addEventListener("click", () => {
  addItems();
  checkUi();
});

clearAllBtn.addEventListener("click", () => {
  listItems.innerHTML = "";
  tasksArray = [];
  saveItem();
  renderItem();
  checkUi();
});

listItems.addEventListener("click", (e) => {
  if (e.target.classList.contains("bi-trash-fill")) {
    let li = e.target.parentElement;
    taskText = li.querySelector("span").textContent;
    li.remove();
    tasksArray = tasksArray.filter((text) => text !== taskText);
    saveItem();
    checkUi();
  }
});

filterInput.addEventListener("input", (e) => {
  const text = e.target.value.toLowerCase();
  const items = listItems.querySelectorAll("li");
  items.forEach((item) => {
    let itemName = item.querySelector("span").textContent.toLowerCase();
    if (itemName.indexOf(text) !== -1) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });
});

const saveItem = () => {
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
};

const renderItem = () => {
  let items = JSON.parse(localStorage.getItem("tasks") || []);
  items.map((item) => {
    tasksArray = items;
    createTask(item);
  });
};
