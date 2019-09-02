import EventEmitter from 'events';

/**
 * Factory method to create an EventEmiiter
 * @returns {EventEmitter} EventEmitter
 */
const createEventEmitter = () => new EventEmitter();

export default createEventEmitter;
