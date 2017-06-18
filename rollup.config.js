import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

const NODE_ENV = process.env.NODE_ENV;

export default {
  entry: 'src/lab.util.js',
  exports: 'named',
  external: [
    'kefir', 'karet.util','partial.lenses', 'ramda', 'x-ray', 'date-fns'
  ],
  globals: {
    ramda: 'R',
    kefir: 'Kefir',
    'karet.util': 'U',
    'partial.lenses': 'L',
    'date-fns': 'Dfns',
    'x-ray': 'Xray'
  },
  plugins: [
    process.env.NODE_ENV &&
      replace({ 'process.env.NODE_ENV': JSON.stringify(NODE_ENV) }),
    nodeResolve(),
    babel({
      exclude: 'node_modules/**'
    }),

    NODE_ENV === 'production' && uglify()
  ].filter(x => x)
};
