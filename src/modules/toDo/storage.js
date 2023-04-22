const storage = {
  projects: localStorage.getItem("projects") ?? {},
  projectId: localStorage.getItem("projectId") ?? 1,
  taskId: localStorage.getItem("taskId") ?? 1,
};
export function updateProjectId() {
  storage.projectId += 1;
}
export function updateTaskId() {
  storage.taskId += 1;
}

export function saveProjects(projectsObject) {
  storage.projects = projectsObject;
  updateProjectId();
  updateTaskId();
}

export default storage;
