import DomElements from "./DomElements";

const { content } = DomElements;
const { projectAdder } = DomElements;
const { project } = DomElements;
// debugger;
content.append(projectAdder);
content.append(project);
document.body.append(content);
