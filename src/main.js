import styles from "./styles/styles";
import storage from "./modules/toDo/storage";
import * as Project from "./modules/toDo/project/Project";
import pubsub from "./modules/pubsub/pubsub";
import subscribtions from "./subscribtions";

import initDOM from "./modules/DOM/initDOM";

// DOM
import DomElements from "./modules/DOM/DomElements";

import { renderAllProjects } from "./modules/DOM/projectList/projectListFunctions";

window.pubsub = pubsub;
window.storage = storage;
window.Project = Project;

window.renderAllProjects = renderAllProjects;
