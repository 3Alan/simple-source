const mitt = require('./index');

const emitter = mitt();

// listen to an event
emitter.on('*', e => console.log('* listener:', e));
emitter.on('foo', e => console.log('foo listener:', e));

// clear all listener
// emitter.off('*');

// fire an event
emitter.emit('foo', 'foo data');

// clear all listener
// emitter.all.clear();

// fire an event
emitter.emit('bar', 'bar data');