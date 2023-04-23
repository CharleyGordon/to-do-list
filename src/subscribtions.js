import pubsub from "./modules/pubsub/pubsub";
import eventList from "./eventList";
import { saveProjects } from "./modules/toDo/storage";

pubsub.subscribe(eventList.projectsChaneged, saveProjects);
