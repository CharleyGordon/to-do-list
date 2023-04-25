import eventList from "../../eventList";
import pubsub from "../pubsub/pubsub";
import DomElements from "./DomElements";

const { content } = DomElements;
const { projectAdder } = DomElements;
const { project } = DomElements;
const { projectList } = DomElements;
// debugger;
content.append(projectAdder);
content.append(projectList);
content.append(project);
document.body.append(content);

pubsub.publish(eventList.DOM.startProjectsRender);
