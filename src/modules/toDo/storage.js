import eventList from "../../eventList";
import pubsub from "../pubsub/pubsub";

const storage = {
  projects: JSON.parse(localStorage.getItem("projects")) ?? [],
};

export function saveProjects(projectsObject) {
  storage.projects = projectsObject;
  const jsonProjects = JSON.stringify(projectsObject);
  localStorage.setItem("projects", jsonProjects);
}

export function emittRenderProjects() {
  const projects = storage.projects;
  pubsub.publish(eventList.DOM.renderProjects, projects);
}

export default storage;
