export default function mitt(all) {
  const all = all || new Map();

  const on = (type, handler) => {
    const handlers = all.get(type);
    if(handlers) {
      handlers.push(handler);
    } else {
      all.set(type, [handler]);
    }
  }

  const off = (type, handler) => {
    const handlers = all.get(type);
    if(!handlers) {
      return;
    }

    if(handler) {
      const handlerIndex = handlers.indexOf(handler)
      const hasHandler = handlerIndex !== -1;
      if(hasHandler) {
        handlers.splice(handlerIndex, 1)
      }
    } else {
      all.set(type, [])
    }
  }

  const emit = (type, params) => {
    let handlers = all.get(type);
    if(handlers) {
      handlers.slice().map(handler => handler(params));
    }

    // 没有查找到监听事件，判断是否监听了所有事件 *
    handlers = all.get('*');
    if(handlers) {
      handlers.slice().map(handler => handler(params));
    }
  }

  return {
    all,
    on,
    off,
    emit
  }
}