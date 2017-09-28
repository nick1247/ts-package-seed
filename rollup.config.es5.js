import baseConf from './rollup.config';
const utils = require('./utils');

export default Object.assign(baseConf, {
    dest: `dist/bundle/${utils.getPackageName()}.es5.js`,
    format: 'es'
});