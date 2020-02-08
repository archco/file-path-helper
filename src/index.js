const strUtils = require('./str');
const arrUtils = require('./arr');
const fileUtils = require('./file');

module.exports = Object.assign({},
  strUtils,
  arrUtils,
  fileUtils,
);
