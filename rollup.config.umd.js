import baseConf from './rollup.config';
const utils = require('./utils');

export default Object.assign(baseConf, {
    output: {
        file: `dist/bundle/${utils.getPackageName()}.umd.js`,
        format: 'umd'
    }
});