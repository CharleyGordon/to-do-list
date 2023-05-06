import DomElements from "../DomElements";
import iterateEvents from "../../iterateEvents";
import elementsComposition from "../elementsComposition";
import formatDate from "../../timeInternalization";

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
function handlePriority(taskElement, priorityLevel) {
  taskElement.dataset.priority = priorityLevel;
}
function handleCompleted(taskElement, completedState) {
  if (completedState === "false" || !completedState) return;
  const completedPlaceholder = taskElement.querySelector('[type="checkbox"]');
  completedPlaceholder.checked = true;
  taskElement.dataset.completed = true;
}
export function renderTask(taskObject) {
  debugger;
  const { id, objective, priority, dueDate, note, completed } = taskObject;
  const currentTask = taskTemplate.cloneNode("true");
  const formattedDate = formatDate(dueDate);
  iterateEvents(currentTask, taskEvents);
  currentTask.dataset.id = id;
  currentTask.dataset.dueDate = formattedDate;
  currentTask.querySelector('[name="objective"]').value = objective;
  currentTask.querySelector('[name="priority"]').value = priority;
  currentTask.querySelector('[name="due-date"]').value = dueDate;
  currentTask.querySelector('[name="note"]').value = note;
  bindInitialValues(currentTask);
  handleCompleted(currentTask, completed);
  handlePriority(currentTask, priority);
  taskListUl.append(currentTask);
}

function clearList(taskListUl) {
  taskListUl.innerHTML = "";
}

export function renderAllTasks(tasksArray) {
  debugger;
  taskListUl = taskListUl ?? document.getElementById("task-list");
  clearList(taskListUl);

  if (tasksArray.length === 0) return;
  tasksArray.forEach(renderTask);
}

// export function appendToTaskList(taskObject) {

// }
