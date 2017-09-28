import nodeResolve from 'rollup-plugin-node-resolve';
const utils = require('./utils');

export default {
    input: `build/${utils.getPackageName()}.js`,
    output: {
        file: `dist/bundle/${utils.getPackageName()}.es5.js`,
        format: 'es'
    },
    name: `${utils.getPackageName()}`,
    plugins: [
        nodeResolve({ jsnext: true, main: true })
    ],
    external: Object.keys(utils.getPeerDependencies()),
    sourcemap: true,
    onwarn: (warning) => {
        const skip_codes = [
            'THIS_IS_UNDEFINED',
            'MISSING_GLOBAL_NAME'
        ];
        if (skip_codes.indexOf(warning.code) != -1) return;
        console.error(warning);
    }
};