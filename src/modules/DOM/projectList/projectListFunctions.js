import projectListItemTemplate from "../../../makup/project-list-item-template.html";
import parseHtml from "../../parseHtml";
import pubsub from "../../pubsub/pubsub";
import eventList from "../../../eventList";
import { camelize } from "../../camelize";

function createProjectListItem(projectProperties) {
  const { name } = projectProperties;
  const projectListItem = parseHtml(projectListItemTemplate);
  const anchor = projectListItem.querySelector("a");
  if (!anchor) return;
  anchor.dataset.project = `${name}`;
  projectListItem.querySelector(".name").textContent = name;
  return projectListItem;
}

function hasName(target) {
  const { name } = target;
  return name;
}
function toggleAddClass(target) {
  const camelName = camelize(target.name);
  if (camelName !== "addProject") return;
  const content = target.closest("#content");
  content.classList.toggle(target.name);
}
function toggleAddProject(event) {
  debugger;
  const { target } = event;
  if (!hasName(target)) return;
  toggleAddClass(target);
}

export function expandProjectAdder(event) {
  toggleAddProject(event);
}
function clearProjectList() {
  const projectList = document.getElementById("project-list");
  projectList.innerHTML = "";
}
export function renderProjectListItem(projectElement) {
  debugger;
  const projectList = document.getElementById("project-list");
  const projectListItem = createProjectListItem(projectElement);
  projectList.append(projectListItem);
}

export function renderAllProjects(projectsElement) {
  clearProjectList();
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
