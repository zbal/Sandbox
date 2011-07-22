var __ = require("../maki/lib/underscore.js");
var events = require("events");
var Stream = require('./events_caller.js').MyStream;

var stream = new Stream();

console.log(stream instanceof events.EventEmitter); // true
console.log(Stream.super_ === events.EventEmitter); // true

stream.on("data", function(data) {
    console.log('Received data: "' + data + '"');
})

console.log('Available methods for stream (from within) : '+ __.functions(stream));

stream.write("It works!"); // Received data: "It works!"