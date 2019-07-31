const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const download = require('download-git-repo');
const exec = require('child_process').exec;

async function createProject(options) {
  
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  try {
    console.log(chalk.yellow.bold(`Downloading the latest DigiFi Loan Origination repository into the ${options.targetDirectory || process.cwd()} directory. This could take several minutes. Please wait...`));
    download('direct:http://github.com/digifi-io/loan-origination-system/archive/master.zip', options.targetDirectory || process.cwd(), { clone: false }, function (err) {
      if (err) {
        console.log(chalk.red.bold('Error downloading latest DigiFi Loan Origination repository:', err.message));
        return;   
      };
      console.log(chalk.green.bold(`Download complete in the ${options.targetDirectory || process.cwd()} directory. Checking for next steps...`));
      if (options.runInstall) {
        console.log(chalk.yellow.bold(`Installing dependencies. This could take several minutes. Please wait...`));
        exec('npm i && npm i periodicjs.ext.passport && npm i periodicjs.ext.oauth2server@10.5.21',
          function (error, stdout, stderr) {
            if (error !== null) {
              console.log('exec error: ' + error);
              console.log(chalk.red.bold('Error during npm installation'));
            } else {
              console.log('%s Project ready. Run npm start development to run the project locally.', chalk.green.bold('DONE'));
              console.log(chalk.yellow.bold('Important Note: The app will only run when all proper dependencies are configured.'));
              console.log("For more information on installation and setup, please refer to DigiFi's documentation here: https://docs.digifi.io");
            }
        })
      } else {
        console.log('%s Project ready for installation. Run npm i in the root folder to install dependencies. Then, run npm start development to run the project locally.', chalk.green.bold('DONE'))
        console.log('The app will only run when all proper dependencies are configured.', chalk.yellow.bold('Important Note:'));
        console.log("For more information on installation and setup, please refer to DigiFi's installation documentation here: https://docs.digifi.io");
      }
    })
  } catch (e) {
    console.log(chalk.red.bold('Error downloading latest DigiFi Loan Origination repository:', err.message));
    return;
  } 
}

module.exports = {
  createProject
};