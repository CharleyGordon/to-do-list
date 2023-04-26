import pubsub from "./modules/pubsub/pubsub";
import eventList from "./eventList";
import * as Storage from "./modules/toDo/storage";
import * as Task from "./modules/toDo/task/Task";
import * as Project from "./modules/toDo/project/Project";
import * as projectListFunctions from "./modules/DOM/projectList/projectListFunctions";

import * as projectFucntions from "./modules/DOM/project/projectFunctions";
import * as taskListFunctions from "./modules/DOM/taskList/taskListFunctions";

pubsub.subscribe(eventList.projectsChanged, Storage.saveProjects);

pubsub.subscribe(eventList.taskPriorityChanged, Project.changeTaskPriority);
pubsub.subscribe(eventList.taskCompleted, Project.markTaskAsComplete);
pubsub.subscribe(eventList.taskUncompleted, Task.uncompleteTask);
pubsub.subscribe(eventList.taskToggled, Task.toggleTaskCompleted);
pubsub.subscribe(eventList.taskObjectiveChanged, Task.changeTaskObjective);
// DOM
pubsub.subscribe(eventList.DOM.projectAdded, Project.addProject);
pubsub.subscribe(
  eventList.DOM.projectApproved,
  projectListFunctions.appendProjectToList
);

pubsub.subscribe(
  eventList.DOM.startProjectsRender,
  Project.emittRenderProjects
);

pubsub.subscribe(
  eventList.DOM.renderProjects,
  projectListFunctions.renderAllProjects
);

pubsub.subscribe(eventList.DOM.findProject, Project.provideSearchedProject);

pubsub.subscribe(eventList.DOM.projectFound, projectFucntions.renderProject);

pubsub.subscribe(eventList.DOM.projectApproved, taskListFunctions.renderTask);

pubsub.subscribe(
  eventList.DOM.projectRendered,
  taskListFunctions.renderAllTasks
);

pubsub.subscribe(eventList.DOM.requestTask, projectFucntions.approveTask);

pubsub.subscribe(eventList.DOM.addTask, Project.addTask);

pubsub.subscribe(eventList.DOM.taskApproved, taskListFunctions.renderTask);
