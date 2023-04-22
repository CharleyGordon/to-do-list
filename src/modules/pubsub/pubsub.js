import eventHandler from "./eventHandler";

const pubsub = {
  subscribe(eventName, functionName) {
    eventHandler.addEvent(eventName, functionName);
  },
  unsubscribe(eventName, functionName) {
    eventHandler.removeEvent(eventName, functionName);
  },

  publish(eventName, ...args) {
    eventHandler.fireEvent(eventName, ...args);
  },
};
export default pubsub;
