'use strict';

const eslintConfig = require('eslint-config-mitmaro');

module.exports = eslintConfig(
  [
    'ecmascript-9',
    'node'
  ],
  {
    root: true,
    rules: {
      indent: [
        "error",
        2
      ],
      'brace-style': [
        "error",
        "1tbs"
      ],
      'object-curly-spacing': [
        "error",
        "always"
      ]
    }
  }
);
