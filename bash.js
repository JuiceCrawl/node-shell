var commands = require('./commands');

function done(output){
    process.stdout.write(output);
    process.stdout.write("\nprompt > ");
}

process.stdin.on('data', function (data, file) {
    var cmd = data.toString().trim();

    var array = cmd.split(' ');
          cmd = array[0];
    var argument = array.slice(1).toString();

    // for piping
    var cmdString = data.toString().trim();
    var cmdList = cmdString.split(/\s*\|\s*/g);
    var stdin = '';

    // console.log('cmdList', cmdList);
    // var numOfPipes =  cmdList.length;
    // while(numOfPipes > 0){
    //   i = 0;
    //   console.log(cmdList[i]);
    //   i++;

    //   numOfPipes--;
    // }


    commands[cmd](stdin, argument, done);
});


//if theres items in the array, we need to pass the output to the next items input

