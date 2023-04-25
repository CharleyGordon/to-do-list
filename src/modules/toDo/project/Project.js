import eventList from "../../../eventList";
import pubsub from "../../pubsub/pubsub";
import storage from "../storage";

import * as Task from "../task/Task";

const { projects } = storage;

function uniqueProjectName(name) {
  return !projects.find(function (projectObject) {
    return projectObject.name === name;
  });
}
function project(propertiesObject) {
  const { name, description } = propertiesObject;
  if (!uniqueProjectName(name)) return;
  const tasks = [];
  return {
    name,
    description,
    tasks,
  };
}
function getProjectByName(projectName) {
  return projects.find(function (projectObject) {
    return projectObject.name === projectName;
  });
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

function emittProjectsChanged(projectsObject) {
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
function findTask(taskArray, searchedId) {
  return taskArray.find(function (currentTask) {
    const currentId = currentTask.id;
    return currentId === searchedId;
  });
}
function findTaskInProject(projectName, taskId) {
  const taskArray = getProjectTasks(projectName);
  if (!taskArray) return;
  const targetTask = findTask(taskArray, taskId);
  return targetTask;
}

export function addTask(projectName, taskProperties) {
  const projectTasks = getProjectTasks(projectName);
  projectTasks.push(Task.createTask(taskProperties));
  emittProjectsChanged(projects);
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
