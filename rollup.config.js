import nodeResolve from 'rollup-plugin-node-resolve';
const utils = require('./utils');

export default {
    entry: `build/${utils.getPackageName()}.js`,
    dest: `dist/bundle/${utils.getPackageName()}.es5.js`,
    format: 'es',
    moduleName: `${utils.getPackageName()}`,
    plugins: [
        nodeResolve({ jsnext: true, main: true })
    ],
    external: Object.keys(utils.getPeerDependencies()),
    sourceMap: true,
    onwarn: (warning) => {
        const skip_codes = [
            'THIS_IS_UNDEFINED',
            'MISSING_GLOBAL_NAME'
        ];
        if (skip_codes.indexOf(warning.code) != -1) return;
        console.error(warning);
    }
};