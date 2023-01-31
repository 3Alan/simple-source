import mitt from "./index";

const emitter = mitt();

// fire an event
emitter.emit('foo', { a: 'b' });

// listen to an event
emitter.on('foo', e => console.log('foo', e) );