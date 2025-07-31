'use strict';

var util         = require('util');
var ResourceBase = require('./resourceBase');

const { processCreateResourceParams } = require('../utils/params');

var LettersPrice = function (config) {
  ResourceBase.call(this, 'letters/price', config);
};

util.inherits(LettersPrice, ResourceBase);

(function () {

  this.list = function (options, callback) {

    if (typeof options === 'function') {
      callback = options;
      options  = {};
    }

    return this._transmit('GET', null, options, null, callback);
  };


  this.getPrice = function (params, callback) {
    return this._transmit('POST', null, null, processCreateResourceParams(params), callback);
  };


}).call(LettersPrice.prototype);

module.exports = LettersPrice;
