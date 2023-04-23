const storage = {
  projects: JSON.parse(localStorage.getItem("projects")) ?? [],
};

export function saveProjects(projectsObject) {
  storage.projects = projectsObject;
  const jsonProjects = JSON.stringify(storage.projects);
  localStorage.setItem("projects", jsonProjects);
}

export default storage;
