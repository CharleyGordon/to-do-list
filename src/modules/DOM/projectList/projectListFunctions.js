import projectListItemTemplate from "../../../makup/project-list-item-template.html";
import parseHtml from "../../parseHtml";
import pubsub from "../../pubsub/pubsub";
import eventList from "../../../eventList";

function createProjectListItem(projectProperties) {
  const { name } = projectProperties;
  const projectListItem = parseHtml(projectListItemTemplate);
  const anchor = projectListItem.querySelector("a");
  if (!anchor) return;
  anchor.dataset.project = `${name}`;
  projectListItem.querySelector(".name").textContent = name;
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
  if (!anchor) return;
  const projectName = anchor.dataset.project;
  pubsub.publish(eventList.DOM.findProject, projectName);
}

export function appendProjectToList(projectElement) {
  debugger;
  const projectList = document.getElementById("project-list");
  const projectListItem = createProjectListItem(projectElement);
  projectList.append(projectListItem);
}
