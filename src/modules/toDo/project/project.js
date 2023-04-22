import storage from "../storage";

const { projects } = storage;

function returnFreeProjectId() {
  const currentId = storage.projectId;
  return currentId + 1;
}
// function r

function project(propertiesObject) {
  const { name, description } = propertiesObject;
  return {
    name,
    description,
  };
}

function addProject(propertiesObject) {
  const newId = returnFreeProjectId();
  projects[newId] = project(propertiesObject);
}

// function addProject(propertiesObject) {

// }
