const execSync = require('child_process').execSync;
const execWithParentIO = (cmd) => execSync(cmd, { stdio: 'inherit' });

const build = require('./build');
const utils = require('./utils');
const log = utils.log;

const publish = () => {
    let curVersion = execSync(`npm show @ep/${utils.getPackageName()} version`).toString().trim();
    if (curVersion == utils.getPackageVersion()) {
        log.error(`Version ${curVersion} already published`);
        return;
    }

    execWithParentIO('npm run tslint');
    build();
    execWithParentIO(`cd dist && npm publish`);

    console.log();
    log.success(`Successfully published @ep/${utils.getPackageName()} v${utils.getPackageVersion()}`);
}

publish();