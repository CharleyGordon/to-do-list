import eventList from "../../../eventList";
import pubsub from "../../pubsub/pubsub";
import DomElements from "../DomElements";

const { project } = DomElements;
// const { taskList } = DomElements;

function provideProjectName() {
  return project.dataset.project;
}

export function renderProject(projectObject) {
  // debugger;
  const { name, description, tasks } = projectObject;
  project.dataset.project = name;
  const projectName = project.querySelector("#project-name");
  const projectDescription = project.querySelector("#project-description");
  projectName.textContent = name;
  projectDescription.textContent = description;
  pubsub.publish(eventList.DOM.projectRendered, tasks);
}

export function approveTask(taskProperties) {
  // debugger;
  const projectName = provideProjectName();
  if (!projectName) return;
  pubsub.publish(eventList.DOM.addTask, projectName, taskProperties);
  // pubsub.publish(eventList.DOM.taskApproved, taskProperties);
}

function getTaskElement(targetElement) {
  const taskElement = targetElement.closest(".task");
  return taskElement;
}
function getTaskId(taskElement) {
  const taskId = taskElement?.dataset.id;
  return taskId;
}
function getTaskElementId(targetElement) {
  const taskElement = getTaskElement(targetElement);
  const taskId = getTaskId(taskElement);
  return taskId;
}

function startBubbleTask(targetElement) {
  // debugger;
  const taskId = getTaskElementId(targetElement);
  if (!taskId) return;
  pubsub.publish(eventList.DOM.taskBubbled, taskId);
}
export function bubbleRemoveTask(event) {
  // event.preventDefault();
  // debugger;
  const { target } = event;
  if (target.dataset.action !== "remove") return;
  startBubbleTask(target);
}

function fieldsAreReadOnly(fieldArray) {
  return fieldArray.every((field) => field.readOnly);
}

function allowToEditFields(fieldArray) {
  fieldArray.forEach((element) => {
    element.removeAttribute("readonly");
  });
}

function setFieldsAsReadOnly(fieldArray) {
  fieldArray.forEach((field) => {
    field.setAttribute("readonly", "");
  });
}

function decideAboutChange(fieldArray) {
  const areReadOnly = fieldsAreReadOnly(fieldArray);
  if (areReadOnly) return allowToEditFields(fieldArray);
  return setFieldsAsReadOnly(fieldArray);
}

function collectEditables(taskElement) {
  const editables = Array.from(taskElement.querySelectorAll(".editable"));
  return editables;
}

function toggleChange(taskElement) {
  if (!taskElement) return;
  const editableFields = collectEditables(taskElement);
  return decideAboutChange(editableFields);
}

export function handleChangeTask(event) {
  const { target } = event;
  if (target.dataset.action !== "change") return;
  const taskElement = getTaskElement(target);
  toggleChange(taskElement);
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
