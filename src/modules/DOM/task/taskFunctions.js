import eventList from "../../../eventList";
import pubsub from "../../pubsub/pubsub";
import formatDate from "../../timeInternalization";

const taskSelector = ".task";

export function removeTaskFromDom(taskId) {
  const taskSelector = `[data-id="${taskId}"]`;
  const taskToRemove = document.querySelector(taskSelector);
  if (!taskToRemove) return;
  taskToRemove.remove();
}

function updateTaskDueDate(taskElement, dateValue) {
  if (!taskElement || !dateValue) return;
  const formattedDate = formatDate(dateValue);
  taskElement.dataset.dueDate = formattedDate;
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
  trackDueDate(target);
}
