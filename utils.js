const fs = require('fs');
const colors = require('colors');

const log = {
    debug: (message) => console.log(message),
    info: (message) => console.log(message.cyan),
    success: (message) => console.log(message.green),
    warn: (message) => console.log(message.yellow),
    error: (message) => console.log(message.red)
}

const errorHandler = (err, stdout, stderr) => {
    if (stdout) log.debug(`stdout: ${stdout}`);
    if (stderr) {
        log.debug('stderr: ');
        log.error(stderr);
    }
}

const logStep = (step, message) => {
    let time = new Date().toLocaleTimeString();
    console.log(('[' + time + '] ').grey + step.magenta + ' ' + message);
}

const getPackageJson = () => JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const getPackageName = () => getPackageJson().name;
const getPackageVersion = () => getPackageJson().version;

const getPeerDependencies = () => {
    let pkgJson = getPackageJson();

    return pkgJson.peerDependencies;
}

module.exports = {
    getPackageName,
    getPackageVersion,
    getPeerDependencies,
    log,
    logStep
}