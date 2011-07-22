var util = require("util");
var events = require("events");
var __ = require("../maki/lib/underscore.js");

var MyStream = function() {
    events.EventEmitter.call(this);
}

util.inherits(MyStream, events.EventEmitter);

MyStream.prototype.write = function(data) {
    this.emit("data", data);
}

exports.MyStream = MyStream;

