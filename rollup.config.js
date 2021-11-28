import pkg from './package.json'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

function config ({ name, input, format, minify, ext = 'js' }) {
  const dir = `dist/${format}`
  const minifierSuffix = minify ? '.min' : ''

  return {
    external: ['inputmask'],
    input: `src/${input}.ts`,
    output: {
      file: `${dir}/${input}${minifierSuffix}.${ext}`,
      name,
      format,
      sourcemap: true,
      globals: {}
    },
    plugins: [
      json(),
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declarationDir: '.'
      }),
      minify
        ? terser({
          compress: true,
          mangle: true
        })
        : undefined
    ].filter(Boolean)
  }
}

function mapConfigs ({ name, input }) {
  return [
    // { name, input, format: "esm", minify: false, ext: 'mjs' },
    // { name, input, format: "esm", minify: true, ext: 'mjs' },
    // { name, input, format: "esm", minify: false },
    // { name, input, format: "esm", minify: true },
    { name, input, format: 'umd', minify: false },
    { name, input, format: 'umd', minify: true }
  ]
}

export default [
  ...mapConfigs({ name: pkg.name, input: 'index' })
].map(config)
