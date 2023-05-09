import pubsub from "../../pubsub/pubsub";
import eventList from "../../../eventList";

export function requestAddProject(event) {
  event.preventDefault();
  const { target } = event;
  const taskName = target.querySelector("#name");
  const taskDescription = target.querySelector("#description");
  const propertyObject = {
    name: taskName.value,
    description: taskDescription.value,
  };
  pubsub.publish(eventList.DOM.projectAdded, propertyObject);
  target.reset();
  const content = document.getElementById("content");
  content.classList.remove("add-project");
}
