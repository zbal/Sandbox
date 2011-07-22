var util = require("util");
var events = require("events");
var __ = require("../maki/lib/underscore.js");

function MyStream() {
    events.EventEmitter.call(this);
}

util.inherits(MyStream, events.EventEmitter);

MyStream.prototype.write = function(data) {
    this.emit("data", data);
}

var stream = new MyStream();

console.log(stream instanceof events.EventEmitter); // true
console.log(MyStream.super_ === events.EventEmitter); // true

stream.on("data", function(data) {
    console.log('Received data: "' + data + '"');
})

console.log('Available methods for stream (from within) : '+ __.functions(MyStream));

stream.write("It works!"); // Received data: "It works!"