import DomElements from "../DomElements";
import iterateEvents from "../../iterateEvents";
import elementsComposition from "../elementsComposition";
let taskListUl = document.getElementById("task-list");

const taskTemplate = DomElements.task;
const taskEvents = elementsComposition.task.events;

export function renderTask(taskObject) {
  debugger;
  const { id, objective, priority, dueDate, note } = taskObject;
  const currentTask = taskTemplate.cloneNode("true");
  iterateEvents(currentTask, taskEvents);
  currentTask.dataset.id = id;
  currentTask.querySelector(".objective").textContent = objective;
  currentTask.querySelector(".priority").textContent = priority;
  currentTask.querySelector(".due-date").textContent = dueDate;
  currentTask.querySelector(".note").textContent = note;
  taskListUl.append(currentTask);
}
export function renderAllTasks(tasksArray) {
  taskListUl = taskListUl ?? document.getElementById("task-list");

  taskListUl.innerHTML = "";
  if (tasksArray.length === 0) return;
  tasksArray.forEach(renderTask);
}
// export function appendToTaskList(taskObject) {

// }
