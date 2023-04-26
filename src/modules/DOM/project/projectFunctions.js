import eventList from "../../../eventList";
import pubsub from "../../pubsub/pubsub";
import DomElements from "../DomElements";

const { project } = DomElements;
// const { taskList } = DomElements;

export function renderProject(projectObject) {
  debugger;
  const { name, description, tasks } = projectObject;
  const projectName = project.querySelector("#project-name");
  const projectDescription = project.querySelector("#project-description");
  projectName.textContent = name;
  projectDescription.textContent = description;
  pubsub.publish(eventList.DOM.projectRendered, tasks);
}
