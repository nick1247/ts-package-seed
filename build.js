const colors = require('colors');
const execSync = require('child_process').execSync;
const execWithParentIO = (cmd) => execSync(cmd, { stdio: 'inherit' });
const copyfiles = require('copyfiles');
const fs = require('fs');

const utils = require('./utils');

const log = utils.log;
const logStep = utils.logStep;
const buildDir = 'build';
const distDir = 'dist';

const cleanDir = (dirName) => {
    logStep('cleanDir', 'cleaning ' + dirName + ' dir');
    execWithParentIO(`rm -rf ${dirName} && mkdir ${dirName}`);
}

const tsc = (tsconfig) => {
    logStep('tsc', 'compiling ' + tsconfig);
    execWithParentIO(`node node_modules/typescript/bin/tsc -p ${tsconfig}`);
}

const rollup = (rollupConfig) => {
    logStep('rollup', 'bundling ' + rollupConfig);
    execWithParentIO(`node node_modules/rollup/bin/rollup -c ${rollupConfig} --environment distDir:${distDir}`);
}

const copyDeclarations = (src, dest) => {
    logStep('copyDeclarations', 'from ' + src + ' to ' + dest);

    execWithParentIO(`node node_modules/copyfiles/copyfiles ${src}/**/*.d.ts ${dest}/ -u 1`);
}

const createPackageJson = (dest) => {
    logStep('createPackageJson', dest);
    let pkgJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    let targetPkgJson = {};
    let fieldsToCopy = ['name', 'version', 'description', 'author', 'repository', 'license'];
    fieldsToCopy.forEach((field) => { targetPkgJson[field] = pkgJson[field]; });

    targetPkgJson['main'] = `bundle/${utils.getPackageName()}.umd.js`;
    targetPkgJson['module'] = `bundle/${utils.getPackageName()}.es5.js`;
    targetPkgJson['es2015'] = `bundle/${utils.getPackageName()}.js`;
    targetPkgJson['typings'] = `${utils.getPackageName()}.d.ts`;

    targetPkgJson.peerDependencies = utils.getPeerDependencies();

    fs.writeFileSync(`${dest}/package.json`, JSON.stringify(targetPkgJson, null, 2));
}



const es2015 = () => {
    log.info('[es2015]');
    cleanDir(buildDir);

    tsc('tsconfig.es2015.json');
    rollup('rollup.config.es2015.js');
    copyDeclarations(buildDir, distDir);
    console.log();
}

const es5 = () => {
    log.info('[es5]');
    cleanDir(buildDir);

    tsc('tsconfig.es5.json');
    rollup('rollup.config.es5.js');
    console.log();
}

const umd = () => {
    log.info('[umd]');
    cleanDir(buildDir);

    tsc('tsconfig.es5.json');
    rollup('rollup.config.umd.js');
    console.log();
}

const build = () => {
    cleanDir(distDir);
    es2015();
    es5();
    umd();
    createPackageJson(distDir);
}

module.exports = build;