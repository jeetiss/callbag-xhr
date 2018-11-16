const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function(config) {
  config.set({
    browserNoActivityTimeout: 60000,
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha'],

    files: [
      {
        pattern: 'test/*.js',
        watched: false,
      },
    ],

    plugins: ['karma-chrome-launcher', 'karma-mocha', 'karma-rollup-preprocessor'],

    preprocessors: {'test/*.js': ['rollup']},
    rollupPreprocessor: {
      plugins: [
        resolve({browser: true}),
        commonjs({include: 'node_modules/**', namedExports: { 'chai': ['expect'] },}),
        babel(),
      ],
      output: {
        format: 'iife',
        name: 'callbag_xhr',
        sourcemap: false,
      },
    },
  })
}