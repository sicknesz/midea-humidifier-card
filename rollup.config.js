import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';
import dotenv from 'dotenv';

const dev = process.env.ROLLUP_WATCH;
dotenv.config();

const serveopts = {
  contentBase: ['./dist'],
  host: '0.0.0.0',
  port: 5000,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const plugins = [  
  nodeResolve({}),
  commonjs(),
  typescript(),
  json(),
  babel({
    exclude: 'node_modules/**',
  }),
  dev && serve(serveopts),
  !dev && terser({ format: { comments: false } }),
];

export default [
  {
    input: 'src/midea-humidifier-card.ts',
    output: {
      file: 'dist/midea-humidifier-card.js',
      format: 'es',
    },
    plugins: [...plugins],
  },
  {
    input: 'src/midea-humidifier-card-editor.ts',
    output: {
      file: 'dist/midea-humidifier-card-editor.js',
      format: 'es',
    },
    plugins: [...plugins],
  }  
];
