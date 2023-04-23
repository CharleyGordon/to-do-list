export function createTask(taskProperties) {
  const { objective, priority, dueDate, note } = taskProperties;
  const completed = false;
  const id = crypto.randomUUID();
  return {
    id,
    objective,
    priority,
    dueDate,
    note,
    completed,
  };
}
export function changeTaskObjective(taskObject, newObjective) {
  debugger;
  taskObject.objective = newObjective;
}

export function changeTaskPriority(taskObject, newPriority) {
  taskObject.priority = newPriority;
}

export function toggleTaskCompleted(taskObject) {
  taskObject.completed = !taskObject.completed;
}

export function uncompleteTask(taskObject) {
  taskObject.completed = false;
}

export function completeTask(taskObject) {
  taskObject.completed = true;
}
