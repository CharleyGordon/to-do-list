import projectListItemTemplate from "../../../makup/project-list-item-template.html";
import parseHtml from "../../parseHtml";

function createProjectListItem(projectProperties) {
  const { name, description } = projectProperties;
  const projectListItem = parseHtml(projectListItemTemplate);
  const anchor = projectListItem.querySelector("a");
  anchor.href = `#${name}`;
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

export function appendProjectToList(projectElement) {
  debugger;
  const projectList = document.getElementById("project-list");
  const projectListItem = createProjectListItem(projectElement);
  projectList.append(projectListItem);
}
