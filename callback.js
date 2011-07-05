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
            callback(stdout);
        });
  },

  update: function (callback) {
    var MySQL = this;
    MySQL.query('use mysql; select user, host from user where user = \'root\';', function(data) {
      callback(data);
    });
  },
};

var mysql = new MySQL();
/*
mysql.query('use mysql; select user, host from user where user = \'root\';', function(data) {
  console.log('data from query : '+ data);
});


function test_result() {
  return 'toto';
}

console.log(test_result());
console.log('premmmss !!');
*/

var actions = require('./config.js').actions;
var __ = require('../maki/lib/underscore.js');

__(actions).forEach(function(action,label){
  if (action.type == 'exec') {
    exec(action.run, function (error, stdout, stderr){
      if (error) { throw error };
      console.log(stdout);
    });
  }
  if ( action.type == 'db') {
    mysql.update(function(data){
      console.log('db : '+ data);
    });
  }
});
