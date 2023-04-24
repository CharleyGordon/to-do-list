import projectListItemTemplate from "../../../makup/project-list-item-template.html";
import parseHtml from "../../parseHtml";

function createProjectListItem(projectProperties) {
  const { name, description } = projectProperties;
  const projectListItem = parseHtml(projectListItemTemplate);
  projectListItem.querySelector(".name").textContent = name;
  projectListItem.querySelector(".description").textContent = description;
  return projectListItem;
}

export function renderProjectListItem(projectElement) {
  const projectList = document.getElementById("project-list");
  const projectListItem = createProjectListItem(projectElement);
  projectList.append(projectListItem);
}

export function appendProjectToList(projectElement) {
  const projectList = document.getElementById("project-list");
  const projectListItem = createProjectListItem(projectElement);
  projectList.append(projectListItem);
}
