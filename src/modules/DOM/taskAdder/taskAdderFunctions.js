import eventList from "../../../eventList";
import pubsub from "../../pubsub/pubsub";

function resetForm(targetElement) {
  targetElement.reset();
}

function collapseDetails(targetElement) {
  const details = targetElement.closest("details");
  details.removeAttribute("open");
}

function hideTaskAdder(targetElement) {
  resetForm(targetElement);
  collapseDetails(targetElement);
}

export function requestAddTask(event) {
  event.preventDefault();
  const { target } = event;
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
  hideTaskAdder(target);
  pubsub.publish(eventList.DOM.requestTask, requestObject);
}
