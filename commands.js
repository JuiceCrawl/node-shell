var fs = require('fs');
var request = require('request');

var commands = {
  pwd: function(stdin, data, done){
    var pwd = process.env.PWD; // remove the newline
    done(pwd);
  },
  date: function(stdin, data, done){
    var normalDate = new Date().toString();
    done(normalDate); 
  },
  ls: function(stdin, data, done){
    fs.readdir('.', function(err, files) {
      if (err) throw err;

      var allFiles = '';
      files.forEach(function(file) {
        allFiles += file.toString() + "\n";
      });
      done(allFiles.slice(0,-1));
    });
  },
  echo: function(stdin, arg,done ){
    done(arg);
  },
  cat: function(stdin, file,done){
    fs.readFile(file, function(err, data) {
    if (err) throw err;

    done(data.toString());
    });
  },
  head: function(stdin, file,done){
    var splitLines;
    fs.readFile(file, function(err, data) {
    if (err) throw err;
    splitLines = data.toString().split('\n');
    
    var topOfFile = '';

    for(var i = 0; i < 5; i ++){
      topOfFile += splitLines[i] + "\n";
    }
    done(topOfFile);
    });
  },
  tail: function(stdin, file,done){
    var splitLines;
    fs.readFile(file, function(err, data) {
    if (err) throw err;
    splitLines = data.toString().split('\n');
    
    var bottomOfFile = '';
    for(var i = splitLines.length-5; i < splitLines.length; i++){
      bottomOfFile += splitLines[i] + "\n";
    }
    done(bottomOfFile);
    });
  },
  wc: function(stdin, file, done){
    var splitLines;
    fs.readFile(file, function(err, data) {
    if (err) throw err;
    splitLines = data.toString().split('\n');
    var length = splitLines.length.toString();
      done(length);
    });
  },
  sort: function(stdin, file, done){
    var splitLines;
    fs.readFile(file, function(err, data) {
    if (err) throw err;
    splitLines = data.toString().split('\n');

    var sorted = splitLines.sort().join('\n');

      done(sorted);
    });
  },
  uniq: function(stdin, file, done){
     var splitLines;
    fs.readFile(file, function(err, data) {
    if (err) throw err;
    splitLines = data.toString().split('\n');

    var filtered = splitLines.filter(function(line,index){
      
      return splitLines[index] !== splitLines[index+1];
    }).join('\n');

      done(filtered);

    });
  },
  curl: function(stdin, file, done){
    request(file, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        done(body);
      }
    });
  },
};

module.exports = commands;
