/* tslint:disable */
/* eslint-disable */
const { exec } = require('child_process');

const commands = {
  darwin: 'open -n -a /Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security',
  linux: 'google-chrome --disable-web-security --user-data-dir="devTest"',
};
const execCB = (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
};

commands[process.platform]
  ? exec(commands[process.platform], (error, stdout, stderr) => execCB(error, stdout, stderr))
  : console.error('Your platform is not supported :(');
