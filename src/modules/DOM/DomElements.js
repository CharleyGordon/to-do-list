import parseHtml from "../parseHtml";
import iterateEvents from "../iterateEvents";
import elementsComposition from "./elementsComposition";

function createContentElement() {
  const contentElement = document.createElement("div");
  contentElement.id = "content";
  return contentElement;
}

function createProjectAdderElement() {
  const { markup } = elementsComposition.projectAdder;
  const eventsObject = elementsComposition.projectAdder.events;
  const projectAdder = parseHtml(markup);
  iterateEvents(projectAdder, eventsObject);
  return projectAdder;
}

function createTaskElement() {
  const { markup } = elementsComposition.task;
  const eventsObject = elementsComposition.task.events;
  const task = parseHtml(markup);
  iterateEvents(task, eventsObject);
  return task;
}

function createTaskAdderElement() {
  const { markup } = elementsComposition.taskAdder;
  const eventsObject = elementsComposition.taskAdder.events;
  const taskAdder = parseHtml(markup);
  iterateEvents(taskAdder, eventsObject);
  return taskAdder;
}

function createTaskListElement() {
  const { markup } = elementsComposition.tasklist;
  const eventsObject = elementsComposition.tasklist.events;
  const taskSection = parseHtml(markup);
  iterateEvents(taskSection, eventsObject);
  return taskSection;
}

function setInitialButtonNames(element) {
  const buttons = Array.from(element.querySelectorAll(".controls button"));
  buttons.forEach((button) => {
    button.dataset.initialValue = button.name;
  });
}

function createProjectElement() {
  const { markup } = elementsComposition.project;
  const eventsObject = elementsComposition.project.events;
  const project = parseHtml(markup);
  iterateEvents(project, eventsObject);
  const taskAdder = createTaskAdderElement();
  const taskList = createTaskListElement();
  setInitialButtonNames(project);

  project.append(taskAdder);
  project.append(taskList);
  return project;
}

function createProjectListElement() {
  const { markup } = elementsComposition.projectList;
  const eventsObject = elementsComposition.projectList.events;
  const projectList = parseHtml(markup);
  iterateEvents(projectList, eventsObject);
  return projectList;
}

export default {
  content: createContentElement(),
  project: createProjectElement(),
  projectAdder: createProjectAdderElement(),
  projectList: createProjectListElement(),
  taskList: createTaskListElement(),
  task: createTaskElement(),
};
