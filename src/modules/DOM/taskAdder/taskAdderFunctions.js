import eventList from "../../../eventList";
import pubsub from "../../pubsub/pubsub";

export function requestAddTask(event) {
  debugger;
  event.preventDefault();
  const priorityField = document.getElementById("priority");
  const dueDateField = document.getElementById("due-date");
  const objectiveField = document.getElementById("objective");
  const noteField = document.getElementById("note");
  const requestObject = {
    priority: priorityField.valueAsNumber,
    dueDate: dueDateField.value,
    objective: objectiveField.value,
    note: noteField.value,
  };
  console.dir(requestObject);
  pubsub.publish(eventList.DOM.requestTask, requestObject);
}
