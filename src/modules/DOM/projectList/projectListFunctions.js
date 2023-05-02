import projectListItemTemplate from "../../../makup/project-list-item-template.html";
import parseHtml from "../../parseHtml";
import pubsub from "../../pubsub/pubsub";
import eventList from "../../../eventList";
import { camelize } from "../../camelize";

function setUnfinishedAmount(element, unfinishedAmount) {
  debugger;
  if (!element || !unfinishedAmount) return;
  console.dir(`updating ${element}....`);
  element.dataset.unfinished = unfinishedAmount;
}

export function updateUnfinishedAmount(projectObject) {
  debugger;
  console.dir("starting....");
  if (!projectObject) return;
  const { name } = projectObject;
  console.dir(`searhing for ${name}....`);

  const { unfinished } = projectObject;
  const selector = `[data-project="${name}"]`;
  console.dir("the selector is: ", selector);
  const projectAnchor = document.querySelector(selector);
  setUnfinishedAmount(projectAnchor, unfinished);
}

function createProjectListItem(projectProperties) {
  const { name, unfinished } = projectProperties;
  const projectListItem = parseHtml(projectListItemTemplate);
  const anchor = projectListItem.querySelector("a");
  if (!anchor) return;
  anchor.dataset.project = `${name}`;
  setUnfinishedAmount(anchor, unfinished);
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
  const projectList = document.querySelector(".project-list");
  projectList.innerHTML = "";
}

export function renderProjectListItem(projectElement) {
  debugger;
  const projectList = document.querySelector(".project-list");
  const projectListItem = createProjectListItem(projectElement);
  projectList.append(projectListItem);
}

export function renderAllProjects(projectsElement) {
  clearProjectList();
  projectsElement.forEach((projectElement) => {
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
