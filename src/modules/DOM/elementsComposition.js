import projectTemplate from "../../makup/project-template.html";
import projectAdderTemplate from "../../makup/project-adder-template.html";
import projectTaskAdderTemplate from "../../makup/project-task-adder-template.html";
import projectListTemplate from "../../makup/project-list-template.html";
import taskTemlate from "../../makup/task-template.html";
import taskListTemplate from "../../makup/project-task-list-template.html";

import * as taskFunctions from "./task/taskFunctions";
import * as projectFunctions from "./project/projectFunctions";
import * as projectAdderFunctions from "./projectAdder/ProjectAdderFunctions";
import * as projectListFunctions from "./projectList/projectListFunctions";
import * as taskAdderFunctions from "./taskAdder/taskAdderFunctions";

export default {
  project: {
    markup: projectTemplate,
    events: {
      submit: [
        projectFunctions.bubbleRemoveTask,
        projectFunctions.handleChangeTask,
        projectFunctions.markAsEditing,
        projectFunctions.saveChanges,
      ],
    },
  },
  task: {
    markup: taskTemlate,
    events: {},
  },
  projectAdder: {
    markup: projectAdderTemplate, // const projectAdder = p
    events: {
      submit: [projectAdderFunctions.requestAddProject],
    },
  },
  taskAdder: {
    markup: projectTaskAdderTemplate,
    events: {
      submit: [taskAdderFunctions.requestAddTask],
    },
  },
  projectList: {
    markup: projectListTemplate,
    events: {
      click: [projectListFunctions.requestProject],
    },
  },
  tasklist: {
    markup: taskListTemplate,
    events: {},
  },
};
