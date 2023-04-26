import DomElements from "../DomElements";

let taskListUl = document.getElementById("task-list");

const taskTemplate = DomElements.task;
export function appendToTaskList() {}

function renderTask(taskObject) {
  const { objective, priority, dueDate, note } = taskObject;
  const currentTask = taskTemplate.cloneNode("true");

  currentTask.querySelector(".objective").textContent = objective;
  currentTask.querySelector(".priority").textContent = priority;
  currentTask.querySelector(".due-date").textContent = dueDate;
  currentTask.querySelector(".note").textContent = note;
  taskListUl.append(currentTask);
}
export function renderTasks(tasksArray) {
  taskListUl = taskListUl ?? document.getElementById("task-list");
  taskListUl.innerHTML = "";
  tasksArray.forEach(renderTask);
}
