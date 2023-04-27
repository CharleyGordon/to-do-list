import eventList from "../../../eventList";
import pubsub from "../../pubsub/pubsub";
import DomElements from "../DomElements";

const { project } = DomElements;
// const { taskList } = DomElements;

function provideProjectName() {
  return project.dataset.project;
}

export function renderProject(projectObject) {
  debugger;
  const { name, description, tasks } = projectObject;
  project.dataset.project = name;
  const projectName = project.querySelector("#project-name");
  const projectDescription = project.querySelector("#project-description");
  projectName.textContent = name;
  projectDescription.textContent = description;
  pubsub.publish(eventList.DOM.projectRendered, tasks);
}

export function approveTask(taskProperties) {
  debugger;
  const projectName = provideProjectName();
  if (!projectName) return;
  pubsub.publish(eventList.DOM.addTask, projectName, taskProperties);
  pubsub.publish(eventList.DOM.taskApproved, taskProperties);
}

function appendProjectName(taskId) {
  const projectName = provideProjectName();
  return {
    projectName,
    taskId,
  };
}

export function queryRemoveTask(providedId) {
  const { projectName, taskId } = appendProjectName(providedId);
  pubsub.publish(eventList.DOM.removeTask, projectName, taskId);
}

// export function approveTask
