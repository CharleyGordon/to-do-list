export default {
  eventList: new Map(),
  addEvent(eventName, functionName) {
    let targetEvent = this.eventList.get(eventName);
    if (!targetEvent) {
      targetEvent = new Set();
      this.eventList.set(eventName, targetEvent);
    }
    targetEvent.add(functionName);
  },

  removeEvent(eventName, functionName) {
    this.eventList.get(eventName)?.delete(functionName);
  },

  fireEvent(eventName, ...args) {
    if (!this.eventList.get(eventName)) return;

    Array.from(this.eventList.get(eventName)).forEach((functionName) => {
      functionName(...args);
    });
  },
};
