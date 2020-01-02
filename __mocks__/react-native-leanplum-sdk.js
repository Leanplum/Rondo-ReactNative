'use strict';

function sampleMethod(arg1, arg2, cb) {
  cb(`${arg1} + ${arg2}`);
}

module.exports = {sampleMethod};
