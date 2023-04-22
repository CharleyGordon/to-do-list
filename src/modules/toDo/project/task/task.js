import storage from "../../storage";

export function returnFreeTaskId() {
  const currentTaskId = storage.taskId;
  return (taskId += 1);
}

export function task(taskProperties) {
  const { objective, priority, dueDate, note } = taskProperties;
  // return object here
}
