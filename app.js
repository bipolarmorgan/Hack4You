/////////////////////////////////////////////////////
///////////
//////////		Hack4You API Daemon	
//////////    -------------------
/////////
//////////////////////////////////////////////////////
import { express } from "express";
import { json, urlencoded } from "body-parser";
import { readdirSync } from 'fs';
import { createConnection } from 'mysql';
import { createInterface } from 'readline';
import { mysql as _mysql, port, title } from './config.js';
import { lang, returnMessage } from './lang.js';
var lang = new lang();

// Simplify returnMessage function
var rlang = returnMessage;

// Start console
var rl = createInterface(process.stdin, process.stdout);

// Create mysql connection based on config.js
var my = createConnection(_mysql);

// Start express with body parser to parse json
var app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

// Start routes of the api sending via parameter express, mysql connection, config and lang function
readdirSync('./routes/').forEach(file => {
  require("./routes/" + file)(app, my);
});

// Start listening
var server = app.listen(port, function () {
    console.log(title+" daemon is listening on port %s...", server.address().port);
    rl.prompt();
});

global.loggedUsers = new Map();
import { UserManager } from './libs/user_manager.js';
global.userManager = new UserManager();

//Actions Check
readdirSync('./tasks/').forEach(file => {
  var task = require("./tasks/" + file);
  task.startTask();
});


//Console Commands
rl.setPrompt('master > ');
rl.on('line', function(line) {
	console.log(global.userManager.checkUserLogin(line));
    rl.prompt();
});

// Server machine bots
global.machineBots = new Map();
import { generateBots } from './libs/machine_bot_generator.js';
generateBots();