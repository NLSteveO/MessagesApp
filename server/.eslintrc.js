'use strict';

const eslintConfig = require('eslint-config-mitmaro');

module.exports = eslintConfig(
  [
    'ecmascript-9',
    'node'
  ],
  {
    root: true
  }
);
