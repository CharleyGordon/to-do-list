import DomElements from "../DomElements";
import iterateEvents from "../../iterateEvents";
import elementsComposition from "../elementsComposition";

let taskListUl = document.getElementById("task-list");

const taskTemplate = DomElements.task;
const taskEvents = elementsComposition.task.events;

function returnTaskFields(taskElement) {
  const taskFields = taskElement.querySelectorAll("*");
  return taskFields;
}

function bindInitialValues(taskElement) {
  const taskFields = returnTaskFields(taskElement);
  debugger;
  taskFields.forEach((field) => {
    const { value } = field;
    if (value) field.dataset.initialValue = value;
  });
}

export function renderTask(taskObject) {
  debugger;
  const { id, objective, priority, dueDate, note } = taskObject;
  const currentTask = taskTemplate.cloneNode("true");
  iterateEvents(currentTask, taskEvents);
  currentTask.dataset.id = id;
  currentTask.querySelector(`[name="objective"]`).value = objective;
  currentTask.querySelector(`[name="priority"]`).value = priority;
  currentTask.querySelector(`[name="due-date"]`).value = dueDate;
  currentTask.querySelector(`[name="note"]`).value = note;
  bindInitialValues(currentTask);
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
