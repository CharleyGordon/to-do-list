import parseHtml from "../parseHtml";
import iterateEvents from "../iterateEvents";
import elementsComposition from "./elementsComposition";

function createContentElement() {
  const contentElement = document.createElement("div");
  contentElement.id = "content";
  return contentElement;
}

function createProjectAdderElement() {
  const markup = elementsComposition.projectAdder.markup;
  const eventsObject = elementsComposition.projectAdder.events;
  const projectAdder = parseHtml(markup);
  iterateEvents(projectAdder, eventsObject);
  return projectAdder;
}

function createTaskListElement() {
  const markup = elementsComposition.tasklist.markup;
  const eventsObject = elementsComposition.tasklist.events;
  const taskSection = parseHtml(markup);
  iterateEvents(taskSection, eventsObject);
  return taskSection;
}
function createProjectElement() {
  const markup = elementsComposition.project.markup;
  const eventsObject = elementsComposition.project.events;
  const project = parseHtml(markup);
  iterateEvents(project, eventsObject);
  const taskList = createTaskListElement();
  project.append(taskList);
  return project;
}

export default {
  content: createContentElement(),
  project: createProjectElement(),
  projectAdder: createProjectAdderElement(),
};
