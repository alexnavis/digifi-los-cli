const arg = require('arg');
const inquirer = require('inquirer');
const { createProject } = require('./main');

function parseArgumentsIntoOptions(rawArgs) {
 const args = arg(
   {
     '--yes': Boolean,
     '--install': Boolean,
     '-y': '--yes',
     '-i': '--install',
   },
   {
     argv: rawArgs.slice(2),
   }
 );
 return {
   skipPrompts: args['--yes'] || false,
   runInstall: args['--install'] || false,
 };
}

async function promptForMissingOptions(options) {
 if (options.skipPrompts) {
   return {
     ...options
   };
 }

 const questions = [];
  
 const answers = await inquirer.prompt(questions);
 return {
   ...options,
 };
}

async function cli(args) {
 let options = parseArgumentsIntoOptions(args);
 options = await promptForMissingOptions(options);
 await createProject(options);
}

module.exports = {
  cli
};