import pubsub from "./modules/pubsub/pubsub";
import eventList from "./eventList";
import { saveProjects } from "./modules/toDo/storage";
import * as Task from "./modules/toDo/task/Task";
import * as Project from "./modules/toDo/project/Project";

pubsub.subscribe(eventList.projectsChanged, saveProjects);
pubsub.subscribe(eventList.taskPriorityChanged, Project.changeTaskPriority);
pubsub.subscribe(eventList.taskCompleted, Project.markTaskAsComplete);
pubsub.subscribe(eventList.taskUncompleted, Task.uncompleteTask);
pubsub.subscribe(eventList.taskToggled, Task.toggleTaskCompleted);
pubsub.subscribe(eventList.taskObjectiveChanged, Task.changeTaskObjective);
