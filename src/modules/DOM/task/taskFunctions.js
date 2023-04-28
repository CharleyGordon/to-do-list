import eventList from "../../../eventList";
import pubsub from "../../pubsub/pubsub";

export function removeTaskFromDom(taskId) {
  debugger;
  const taskSelector = `[data-id="${taskId}"]`;
  const taskToRemove = document.querySelector(taskSelector);
  if (!taskToRemove) return;
  // maybe add some animation before?
  taskToRemove.remove();
}
