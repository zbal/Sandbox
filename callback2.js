//var async = require('/usr/local/lib/node_modules/asyncjs');
//var __ = require('../maki/lib/underscore.js');
//
//
//async.range(1, 3).each(function(item, next) {
//        console.log(item);
//    })
//    
//console.log("test");
//
//value = async.list([1, 2, 3]).each(function(item, next) {
//        console.log(item);
//    })
//console.log(JSON.stringify(value));
//
//__([1, 2, 3]).forEach(function(item, next) {
//        console.log(item);
//    })
//
//var val = [{'1':'fds'}, {'2':'sd'}, {'3':'fsdd'}];
//
//__(val).forEach(function(item, next) {
//        console.log(item);
//    })
//

var exec = require('child_process').exec;
var exec = require('child_process').exec;

var MySQL = function () {
  var MySQL = this;
};

// Define MySQL prototype and its functions
MySQL.prototype = {
  
  // execute SQL query
  query: function (sql_query, callback) {
    var MySQL = this;

    // Throw error if sql_query is missing
    if (!sql_query || sql_query === '') {throw Error("Missing SQL query")};
    
    // Execute query
    exec('mysql -u root -proot -e "'+ sql_query +'"', 
        function (error, stdout, stderr){
            if (error) { throw error };
            console.log(stdout)
            callback(error);
        });
  },

  update: function (callback) {
    var MySQL = this;
    MySQL.query('use mysql; select user, host from user where user = \'root\';', function(error) {
      callback(error);
    });
  },
};

var mysql = new MySQL();

//  var function1 = function(param, callback) {
//    var success =  
//    exec('sleep 1', function (error, stdout, stderr){
//      if (error) { err = true }
//      else { err = false }
//      console.log('param :'+param);
//      callback(err);
//    });
//  }
//  
//  var function2 = function(param, callback) {
//  //  if (param == true) {
//      exec('sleep 1', function (error, stdout, stderr){
//        if (error) { throw error };
//        console.log(param +'etet'+'sdf');
//      });
//  //  }
//  }

var runable = true;
var list_fn_real = ['encule', 'de ta mere'];
var async = require('/usr/local/lib/node_modules/asyncjs');
var util = require('util');
//var process = require('process');

var actions = require('./config.js').actions;
var __ = require('../maki/lib/underscore.js');

var action_exec = function(action,callback){
  if (action.type == 'exec') {
    exec(action.run, function (error, stdout, stderr){
      if (error) { throw error };
      console.log(stdout);
      callback(error);
    });
  }
  if ( action.type == 'db') {
    mysql.update(function(error){
      console.log('db : '+ error);
      callback(error);
    });
  }
};

var caller = function(run, list_fn, callback) {
  console.log(JSON.stringify(list_fn));
  if (run == true) {
    action_exec(list_fn[0],function(err){
//      process.nextTick(function(){
        if (err) {run = false}
        list_fn.shift()
        if (list_fn.length == 0) {return}
        caller(run,list_fn);
//      })    
    });
  }
}

actionsArray=require('../maki/lib/underscore.js').toArray(actions);
caller(runable, actionsArray);
console.log(JSON.stringify(list_fn_real));

//function1('blabla', function2);
//function2(success, 'bddfdsdf');

//  async.list([
//    function2('sdfsdf'),
//    function1('blabla')
//    ]).call();

