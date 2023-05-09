import projectListItemTemplate from "../../../makup/project-list-item-template.html";
import parseHtml from "../../parseHtml";
import pubsub from "../../pubsub/pubsub";
import eventList from "../../../eventList";
import { camelize } from "../../camelize";

function setUnfinishedAmount(element, unfinishedAmount) {
  if (!element || (!unfinishedAmount && unfinishedAmount !== 0)) return;
  element.dataset.unfinished = unfinishedAmount;
  if (unfinishedAmount === 0) element.removeAttribute("data-unfinished");
}

export function updateUnfinishedAmount(projectObject) {
  if (!projectObject) return;
  const { name } = projectObject;

  const { unfinished } = projectObject;
  const selector = `[data-project="${name}"]`;
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
  const content = document.getElementById("content");
  content.classList.toggle(target.name);
}
function removeAddProject(cssClass = "add-project") {
  const content = document.getElementById("content");
  content.classList.remove(cssClass);
}
function toggleAddProject(event) {
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
  const projectList = document.querySelector(".project-list");
  const projectListItem = createProjectListItem(projectElement);
  projectList.append(projectListItem);
}

function saveCurrentIndicator(selector = ".current") {
  const current = document.querySelector(selector);
  return current?.dataset.project;
}

function restoreCurrentIndicator(projectDataset, cssClass = "current") {
  if (!projectDataset) return;
  const listElement = document.querySelector(
    `[data-project="${projectDataset}"]`
  );
  if (!listElement) return;
  listElement.classList.add(cssClass);
}

function removeCurrent(selector, cssClass = "current") {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;
  elements.forEach((element) => {
    element.classList.remove(cssClass);
  });
}

function markProject(element, cssClass = "current") {
  element.classList.add(cssClass);
}

export function focusOnCurrent(targetElement) {
  const project = targetElement.closest(".project");
  const projectSection = targetElement.closest("#project");
  if (!project || projectSection) return;
  removeAddProject();
  removeCurrent(".project");
  markProject(project);
}

export function markAsCurrent(event) {
  console.log("mark fired");
  event.preventDefault();
  const { target } = event;
  focusOnCurrent(target);
}

export function renderAllProjects(projectsElement) {
  console.log("reRendering...");
  const targetDataset = saveCurrentIndicator();
  clearProjectList();
  projectsElement.forEach((projectElement) => {
    renderProjectListItem(projectElement);
  });
  restoreCurrentIndicator(targetDataset);
}

export function requestProject(event) {
  event.preventDefault();
  const { target } = event;
  const anchor = target.closest("a");
  if (!anchor) return;
  const projectName = anchor.dataset.project;
  pubsub.publish(eventList.DOM.findProject, projectName);
}

export function appendProjectToList(projectElement) {
  const projectList = document.querySelector(".project-list");
  const projectListItem = createProjectListItem(projectElement);
  projectList.append(projectListItem);
}
