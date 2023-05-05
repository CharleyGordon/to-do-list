import pubsub from "./modules/pubsub/pubsub";
import eventList from "./eventList";
import * as Storage from "./modules/toDo/storage";
import * as Task from "./modules/toDo/task/Task";
import * as Project from "./modules/toDo/project/Project";

import * as taskFunctions from "./modules/DOM/task/taskFunctions";
import * as projectListFunctions from "./modules/DOM/projectList/projectListFunctions";

import * as projectFunctions from "./modules/DOM/project/projectFunctions";
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

pubsub.subscribe(eventList.DOM.projectFound, projectFunctions.renderProject);

// pubsub.subscribe(eventList.DOM.projectApproved, taskListFunctions.renderTask);

pubsub.subscribe(
  eventList.DOM.projectRendered,
  taskListFunctions.renderAllTasks
);

pubsub.subscribe(eventList.DOM.requestTask, projectFunctions.approveTask);

pubsub.subscribe(eventList.DOM.addTask, Project.addTask);

pubsub.subscribe(eventList.DOM.taskBubbled, projectFunctions.queryRemoveTask);

pubsub.subscribe(eventList.DOM.removeTask, Project.removeTask);

pubsub.subscribe(eventList.DOM.taskRemoved, taskFunctions.removeTaskFromDom);

pubsub.subscribe(eventList.DOM.taskApproved, taskListFunctions.renderTask);

pubsub.subscribe(eventList.DOM.taskChanged, Project.replaceTask);

pubsub.subscribe(eventList.DOM.projectBubbled, Project.deleteProject);

pubsub.subscribe(eventList.projectDeleted, projectFunctions.removeProject);

pubsub.subscribe(eventList.DOM.projectChanged, Project.changeProjectDetails);

pubsub.subscribe(
  eventList.unfinishedChanged,
  projectListFunctions.updateUnfinishedAmount
);
