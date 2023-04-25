import projectListItemTemplate from "../../../makup/project-list-item-template.html";
import parseHtml from "../../parseHtml";
import pubsub from "../../pubsub/pubsub";
import eventList from "../../../eventList";

function createProjectListItem(projectProperties) {
  const { name, description } = projectProperties;
  const projectListItem = parseHtml(projectListItemTemplate);
  const anchor = projectListItem.querySelector("a");
  anchor.dataset.project = `${name}`;
  projectListItem.querySelector(".name").textContent = name;
  projectListItem.querySelector(".description").textContent = description;
  return projectListItem;
}

export function renderProjectListItem(projectElement) {
  const projectList = document.getElementById("project-list");
  const projectListItem = createProjectListItem(projectElement);
  projectList.append(projectListItem);
}

export function renderAllProjects(projectsElement) {
  projectsElement.forEach(function (projectElement) {
    renderProjectListItem(projectElement);
  });
}

export function requestProject(event) {
  event.preventDefault();

  debugger;
  const { target } = event;
  const anchor = target.closest("a");
  const projectName = anchor.dataset.project;
  pubsub.publish(eventList.DOM.findProject, projectName);
}

export function appendProjectToList(projectElement) {
  debugger;
  const projectList = document.getElementById("project-list");
  const projectListItem = createProjectListItem(projectElement);
  projectList.append(projectListItem);
}
