'use strict';

const eslintConfig = require('eslint-config-mitmaro');

module.exports = eslintConfig(
  [
    'babel',
    'ecmascript-9',
    'react'
  ],
  {
    root: true,
    plugins: [
      'react'
    ]
  }
);
