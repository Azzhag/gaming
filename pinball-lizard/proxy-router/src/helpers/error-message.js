'use strict'

const { type } = require('../config/route/constants/public-route-constants');
const { compile } = require('../obj/Message');

module.exports = exports = err => {
  return compile( "", type.ERROR, 0, 0, { "msg":err } );
}
