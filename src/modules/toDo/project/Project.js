import eventList from "../../../eventList";
import pubsub from "../../pubsub/pubsub";
import storage from "../storage";

import * as Task from "../task/Task";

const { projects } = storage;

function uniqueProjectName(name) {
  return !projects.find((projectObject) => projectObject.name === name);
}

function getProjectByName(projectName) {
  return projects.find((projectObject) => projectObject.name === projectName);
}

function getProjectIndexByName(projectName) {
  return projects.findIndex(
    (projectObject) => projectObject.name === projectName
  );
}

export function provideSearchedProject(projectName) {
  debugger;
  const project = getProjectByName(projectName);
  if (!project) return;
  pubsub.publish(eventList.DOM.projectFound, project);
}

function getProjectTasks(projectName) {
  return getProjectByName(projectName)?.tasks;
}

function unfinishedTask(taskObject) {
  const { completed } = taskObject;
  return completed === "false" || !completed;
}

function countUnfinishedTasks(projectObject) {
  debugger;
  const { name } = projectObject;
  const tasks = getProjectTasks(name);
  if (!tasks) return;
  const UnfinishedTasks = tasks.filter(unfinishedTask);
  return UnfinishedTasks.length;
}

function updateUnfinishedTasks(projectObject) {
  debugger;
  const unfinishedTasksAmount = countUnfinishedTasks(projectObject);
  if (!projectObject) return;
  projectObject.unfinished = unfinishedTasksAmount;
  pubsub.publish(eventList.unfinishedChanged, projectObject);
}

function updateAllUnfinishedTasks() {
  projects.forEach(updateUnfinishedTasks);
}

function project(propertiesObject) {
  const { name, description } = propertiesObject;
  const tasks = [];
  const unfinished = 0;
  if (!uniqueProjectName(name)) return;

  return {
    name,
    description,
    tasks,
    unfinished,
  };
}
function emittProjectsChanged(projectsObject) {
  updateAllUnfinishedTasks();
  pubsub.publish(eventList.projectsChanged, projectsObject);
}

function emittProjectApproved(projectObject) {
  pubsub.publish(eventList.DOM.projectApproved, projectObject);
}

export function emittRenderProjects() {
  pubsub.publish(eventList.DOM.renderProjects, projects);
}

export function addProject(propertiesObject) {
  debugger;
  const projectObject = project(propertiesObject);
  if (!projectObject) return;
  projects.push(projectObject);
  emittProjectsChanged(projects);
  emittProjectApproved(projectObject);
}

export function deleteProject(projectName) {
  debugger;
  const searchedProjectIndex = getProjectIndexByName(projectName);
  if (searchedProjectIndex < 0) return;
  projects.splice(searchedProjectIndex, 1);
  emittProjectsChanged(projects);
  pubsub.publish(eventList.projectDeleted);
  pubsub.publish(eventList.DOM.renderProjects, projects);
}

function findTask(taskArray, searchedId) {
  return taskArray.find((currentTask) => {
    const currentId = currentTask.id;
    return currentId === searchedId;
  });
}
function findTaskIndex(taskArray, searchedId) {
  return taskArray.findIndex((currentTask) => {
    const currentId = currentTask.id;
    return currentId === searchedId;
  });
}
function findTaskInProject(projectName, taskId) {
  debugger;
  const taskArray = getProjectTasks(projectName);
  if (!taskArray) return;
  const targetTask = findTask(taskArray, taskId);
  return targetTask;
}

function findTaskIndexInProject(projectName, taskId) {
  const taskArray = getProjectTasks(projectName);
  if (!taskArray) return;
  const targetTaskIndex = findTaskIndex(taskArray, taskId);
  return targetTaskIndex;
}

export function addTask(projectName, taskProperties) {
  debugger;
  const projectTasks = getProjectTasks(projectName);
  const newTask = Task.createTask(taskProperties);
  projectTasks.push(newTask);
  emittProjectsChanged(projects);
  pubsub.publish(eventList.DOM.taskApproved, newTask);
}

export function changeTaskPriority(projectName, taskId, taskPriority) {
  debugger;
  // const projectTasks = getProjectTasks(projectName);
  // const searchedTask = findTask(projectTasks, taskId);
  const searchedTask = findTaskInProject(projectName, taskId);
  if (!searchedTask) return;
  Task.changeTaskPriority(searchedTask, taskPriority);
  emittProjectsChanged(projects);
}

export function markTaskAsComplete(projectName, taskId) {
  const searchedTask = findTaskInProject(projectName, taskId);
  if (!searchedTask) return;
  Task.completeTask(searchedTask);
  emittProjectsChanged(projects);
}

export function markTaskAsUncomplete(projectName, taskId) {
  const searchedTask = findTaskInProject(projectName, taskId);
  if (!searchedTask) return;
  Task.uncompleteTask(searchedTask);
  emittProjectsChanged(projects);
}

export function toggleTaskCompleteState(projectName, taskId) {
  const searchedTask = findTaskInProject(projectName, taskId);
  if (!searchedTask) return;
  Task.toggleTaskCompleted(searchedTask);
  emittProjectsChanged(projects);
}

export function changeTaskObjective(projectName, taskId, newTaskObjective) {
  const searchedTask = findTaskInProject(projectName, taskId);
  if (!searchedTask) return;
  Task.changeTaskObjective(searchedTask, newTaskObjective);
  emittProjectsChanged(projects);
}

export function replaceTask(projectName, taskId, taskObject) {
  debugger;
  const task = findTaskInProject(projectName, taskId);
  if (!task) return;
  Object.assign(task, taskObject);
  emittProjectsChanged(projects);
}

export function removeTask(projectName, taskId) {
  debugger;
  const projectTasks = getProjectTasks(projectName);
  const targetProjectIndex = findTaskIndexInProject(projectName, taskId);
  if (targetProjectIndex < 0 || !projectTasks) return;
  projectTasks.splice(targetProjectIndex, 1);
  emittProjectsChanged(projects);
  pubsub.publish(eventList.DOM.taskRemoved, taskId);
}

// change name of project
function changeProjectName(oldName, newName) {
  const project = getProjectByName(oldName);
  if (!project || !uniqueProjectName(newName)) return;
  project.name = newName;
}
// change description
function changeProjectDescription(projectName, newDescription) {
  debugger;
  const project = getProjectByName(projectName);
  if (!project || !newDescription) return;
  project.description = newDescription;
}

export function changeProjectDetails(projectName, propertiesObject) {
  const { name, description } = propertiesObject;
  changeProjectName(projectName, name);
  changeProjectDescription(projectName, description);
  emittProjectsChanged(projects);
  pubsub.publish(eventList.DOM.startProjectsRender);
}
