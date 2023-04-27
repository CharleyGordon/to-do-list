import eventList from "../../../eventList";
import pubsub from "../../pubsub/pubsub";

export function bubbleRemoveTask(event) {
  event.preventDefault();
  debugger;
  const { submitter, target, currentTarget } = event;
  if (submitter.dataset.action !== "remove") return;
  const taskId = currentTarget.dataset.id;
  pubsub.publish(eventList.DOM.taskBubbled, taskId);
}

export function removeTaskFromDom(taskId) {
  debugger;
  const taskSelector = `[data-id="${taskId}"]`;
  const taskToRemove = document.querySelector(taskSelector);
  if (!taskToRemove) return;
  //maybe add some animation before?
  taskToRemove.remove();
}
