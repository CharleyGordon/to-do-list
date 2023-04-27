import DomElements from "../DomElements";

let taskListUl = document.getElementById("task-list");

const taskTemplate = DomElements.task;

export function renderTask(taskObject) {
  debugger;
  const { id, objective, priority, dueDate, note } = taskObject;
  const currentTask = taskTemplate.cloneNode("true");
  currentTask.dataset.id = id;
  currentTask.querySelector(".objective").textContent = objective;
  currentTask.querySelector(".priority").textContent = priority;
  currentTask.querySelector(".due-date").textContent = dueDate;
  currentTask.querySelector(".note").textContent = note;
  taskListUl.append(currentTask);
}
export function renderAllTasks(tasksArray) {
  if (tasksArray.length === 0) return;
  taskListUl = taskListUl ?? document.getElementById("task-list");
  taskListUl.innerHTML = "";
  tasksArray.forEach(renderTask);
}
// export function appendToTaskList(taskObject) {

// }
