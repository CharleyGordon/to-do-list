import eventList from "../../../eventList";
import pubsub from "../../pubsub/pubsub";

const taskSelector = ".task";

export function removeTaskFromDom(taskId) {
  debugger;
  const taskSelector = `[data-id="${taskId}"]`;
  const taskToRemove = document.querySelector(taskSelector);
  if (!taskToRemove) return;
  // maybe add some animation before?
  taskToRemove.remove();
}

function updateTaskDueDate(taskElement, dateValue) {
  if (!taskElement || !dateValue) return;
  taskElement.dataset.dueDate = dateValue;
  console.log("date changed");
}

function trackDueDate(targetElement) {
  const { type } = targetElement;
  if (type !== "date") return;
  const dateValue = targetElement.value;
  const taskElement = targetElement.closest(taskSelector);
  updateTaskDueDate(taskElement, dateValue);
}

export function setDueDate(event) {
  const { target } = event;
  const { type } = target;
  trackDueDate(target);
}
