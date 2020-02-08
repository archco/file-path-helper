const arrUtils = require('./arr');
const dateUtils = require('./date');
const fileUtils = require('./file');
const strUtils = require('./str');

module.exports = Object.assign({},
  arrUtils,
  dateUtils,
  fileUtils,
  strUtils,
);
