import eventList from "../../../eventList";
import pubsub from "../../pubsub/pubsub";
import DomElements from "../DomElements";
import { camelize } from "../../camelize";

const { project } = DomElements;
// const { taskList } = DomElements;

function provideProjectName() {
  return project.dataset.project;
}
function projectConnected() {
  return project.isConnected;
}

export function renderProject(projectObject) {
  debugger;
  const { name, description, tasks } = projectObject;
  project.dataset.project = name;
  const projectName = project.querySelector("#project-name");
  const projectDescription = project.querySelector("#project-description");
  projectName.textContent = name;
  projectDescription.textContent = description;
  const connected = projectConnected();
  const content = document.querySelector("#content");
  if (!connected) content.append(project);
  pubsub.publish(eventList.DOM.projectRendered, tasks);
}

export function approveTask(taskProperties) {
  // debugger;
  const projectName = provideProjectName();
  if (!projectName) return;
  pubsub.publish(eventList.DOM.addTask, projectName, taskProperties);
}

function getTaskElement(targetElement) {
  const taskElement = targetElement.closest(".task");
  return taskElement;
}

function toggleEditClass(taskElement) {
  taskElement.classList.toggle("editing");
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
  // debugger;
  const areReadOnly = fieldsAreReadOnly(fieldArray);
  if (areReadOnly) return allowToEditFields(fieldArray);
  return setFieldsAsReadOnly(fieldArray);
}

function collectEditables(taskElement) {
  const editables = Array.from(taskElement.querySelectorAll(".editable"));
  return editables;
}

function toggleChange(taskElement) {
  debugger;
  if (!taskElement) return;
  // toggleEditClass(taskElement);
  const editableFields = collectEditables(taskElement);
  return decideAboutChange(editableFields);
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

// function fieldChanged(field) {
//   return field.value !== field.dataset.initialValue;
// }

// function collectChangedFields(fieldArray) {
//   return fieldArray.reduce((accumulator, fieldElement) => {
//     if (fieldChanged(fieldElement)) accumulator.push(fieldElement);
//     return accumulator;
//   });
// }
// up to this works
function returnTaskEditables(event) {
  debugger;
  const { target } = event;
  const taskElement = getTaskElement(target);
  const editables = collectEditables(taskElement);
  return editables;
}
function getFieldName(field) {
  return camelize(field.name);
}
function getFieldValue(field) {
  return field.value;
}
function getFieldsValues(changedFields) {
  const changedValues = {};
  changedFields.forEach((field) => {
    const name = getFieldName(field);
    const value = getFieldValue(field);
    changedValues[name] = value;
  });
  return changedValues;
}
function collectEditableProperties(event) {
  debugger;
  const editables = returnTaskEditables(event);
  const properties = getFieldsValues(editables);
  return properties;
}

// function trackChanges(event) {
//   debugger;
//   try {
//     const { target } = event;
//     const taskElement = getTaskElement(target);
//     const editables = collectEditables(taskElement);
//     const changedFields = collectChangedFields(editables);
//     const changedValues = getChangedFieldsValues(changedFields);
//     return changedValues;
//   } catch {
//     return false;
//   }
// }

//event functions
function getSubmitter(event) {
  return event.submitter;
}
export function markAsEditing(event) {
  const submitter = getSubmitter(event);
  const { target } = event;
  const taskElement = getTaskElement(target);
  if (
    !submitter.matches(':is([name="change"], [name="save"], [name="restore"])')
  ) {
    return;
  }
  toggleEditClass(taskElement);
}
export function bubbleRemoveTask(event) {
  event.preventDefault();
  // debugger;
  const subbmitter = getSubmitter(event);
  if (subbmitter.name !== "remove") return;
  startBubbleTask(subbmitter);
}
export function handleChangeTask(event) {
  debugger;
  event.preventDefault();
  const subbmitter = getSubmitter(event);
  if (subbmitter.name !== "change") return;
  const taskElement = getTaskElement(subbmitter);

  toggleChange(taskElement);
  console.log("task readonly state changed");
}
function emittTaskChanged(event) {
  debugger;
  const { target } = event;
  const taskElement = getTaskElement(target);
  const taskId = getTaskId(taskElement);
  const projectName = provideProjectName();
  const newProperties = collectEditableProperties(event);
  pubsub.publish(eventList.DOM.taskChanged, projectName, taskId, newProperties);
}
export function saveChanges(event) {
  event.preventDefault();
  debugger;
  const subbmitter = getSubmitter(event);
  if (subbmitter.name !== "save") return;
  // const taskElement = getTaskElement(subbmitter);
  // const taskId = getTaskId(taskElement);
  // const projectName = provideProjectName();
  // const newProperties = collectEditableProperties(event);
  // pubsub.publish(eventList.DOM.taskChanged, projectName, taskId, newProperties);
  emittTaskChanged(event);
}

// export function saveChanges(event) {
//   const changesObject = trackChanges(event);
//   if (!changesObject) return;

// }
// export function approveTask
function findCompletedCheckbox(targetElement) {
  debugger;
  const taskElement = getTaskElement(targetElement);
  if (!taskElement) return;
  const checkbox = taskElement.querySelector(`[name="completed"]`);
  return checkbox;
}
export function toggleCompletedState(event) {
  debugger;
  const { target } = event;
  const currentCheckbox = target.closest(`[type="checkbox"]`);
  const checkbox = findCompletedCheckbox(target);
  if (!currentCheckbox || !checkbox) return;
  checkbox.value = false;
  if (currentCheckbox.checked) checkbox.value = true;
  emittTaskChanged(event);
}

function updateDomPriority(element, priority) {
  element.dataset.priority = priority;
}

function getPriority(target) {
  if (target.name !== "priority") return;
  return target.value;
}
export function chageTaskPriority(event) {
  debugger;
  const { target } = event;
  const taskElement = getTaskElement(target);
  const priorityLevel = getPriority(target);
  if (!taskElement || !priorityLevel) return;
  updateDomPriority(taskElement, priorityLevel);
}

export function removeProject() {
  project.remove();
}

export function bubbleRemoveProject(event) {
  event.preventDefault();
  debugger;
  const { submitter } = event;
  if (submitter.name !== "delete") return;
  const projectName = provideProjectName();
  pubsub.publish(eventList.DOM.projectBubbled, projectName);
}
