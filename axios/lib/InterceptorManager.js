export default class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled,
      rejected
    })

    // 返回当前的 handler 在数组中的 index，用于eject
    return this.handlers.length - 1;
  }

  eject(index) {
    if (this.handlers[index]) {
      this.handlers[index] = null;
    }
  }
}
