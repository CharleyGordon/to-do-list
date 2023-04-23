import storage from "./modules/toDo/storage";
import * as Project from "./modules/toDo/project/Project";
import pubsub from "./modules/pubsub/pubsub";
import subscribtions from "./subscribtions";

window.pubsub = pubsub;
window.storage = storage;
window.Project = Project;
