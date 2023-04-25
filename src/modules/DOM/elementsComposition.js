import projectTemplate from "../../makup/project-template.html";
import projectAdderTemplate from "../../makup/project-adder-template.html";
import projectListTemplate from "../../makup/project-list-template.html";
import taskTemlate from "../../makup/task-template.html";
import taskListTemplate from "../../makup/project-task-list-template.html";

import * as ProjectAdderFunctions from "./projectAdder/ProjectAdderFunctions";
import * as projectListFunctions from "./projectList/projectListFunctions";

export default {
  project: {
    markup: projectTemplate,
    events: {},
  },
  task: {
    markup: taskTemlate,
    events: {},
  },
  projectAdder: {
    markup: projectAdderTemplate, // const projectAdder = p
    events: {
      submit: [ProjectAdderFunctions.requestAddProject],
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
