import eventList from "../../../eventList";
import pubsub from "../../pubsub/pubsub";
import storage from "../storage";

const { projects } = storage;

function task(taskProperties) {
  const { objective, priority, dueDate, note } = taskProperties;
  const id = crypto.randomUUID();
  return {
    id,
    objective,
    priority,
    dueDate,
    note,
  };
}

function project(propertiesObject) {
  const { name, description } = propertiesObject;
  const id = crypto.randomUUID();
  const tasks = [];
  return {
    id,
    name,
    description,
    tasks,
  };
}
function getProjectById(desiredId) {
  return projects.find((project) => (project.id = desiredId));
}

function getProjectTasks(desiredId) {
  return getProjectById(desiredId)?.tasks;
}

function emittProjectsChanged(projectsObject) {
  pubsub.publish(eventList.projectsChaneged, projectsObject);
}

export function addProject(propertiesObject) {
  projects.push(project(propertiesObject));
  emittProjectsChanged(projects);
  console.dir(projects);
}

export function addTask(projectId, taskProperties) {
  const projectTasks = getProjectTasks(projectId);
  projectTasks.push(task(taskProperties));
  console.dir(projects);
}

// function addProject(propertiesObject) {

// }
