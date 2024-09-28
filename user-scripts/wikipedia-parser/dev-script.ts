import fs from 'fs'
import express from 'express'
import chalk from 'chalk'

const userScriptApp = express();

userScriptApp.listen(1234);

console.log('');
console.log(chalk.green('UserScript endpoints are live!'));
console.log(' - http://localhost:1234/server.user-script.js');
console.log('');

userScriptApp.get('/server.user-script.js', (req, res) => {
    const devScript = fs.readFileSync('user-scripts/wikipedia-parser/dev.user-srcipt.js', 'utf-8');

    const version = `2.${Math.floor((new Date()).getTime() / 1000)}`;

    console.log(chalk.blue( `Version ${version} of dev script has been downloaded!`));
    console.log('');

    res.send(devScript.replace('2.0', `${version}`));
});

userScriptApp.get('/dev.user-script.js', (req, res) => {
    console.log(chalk.green('Real script code has been served!'));
    console.log('');

    const devScript = fs.readFileSync('dist-us/wikipedia-parser.user.js', 'utf-8')

    res.send(devScript);
});
