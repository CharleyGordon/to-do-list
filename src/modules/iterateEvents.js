function addHandlers(eventsObject, element, event) {
  eventsObject[event].forEach((handlerFunction) => {
    element.addEventListener(event, handlerFunction);
  });
}
export default function iterateEvents(element, eventsObject) {
  Object.keys(eventsObject).forEach((event) =>
    addHandlers(eventsObject, element, event)
  );
}
