'use strict';

var Message = require('../message');
var inherits = require('util').inherits;
var bitcore = require('@dashevo/dashcore-lib');
var BufferUtil = bitcore.util.buffer;
var $ = bitcore.util.preconditions;
var _ = bitcore.deps._;

/**
 * Contains information about a MnDiffList
 * @param {MnDiffList} arg - An instance of MnDiffList
 * @param {Object=} options
 * @param {Function} options.MnDiffList - a MnDiffList constructor
 * @extends Message
 * @constructor
 */
function MnDiffListMessage(arg, options) {
  Message.call(this, options);
  this.MnDiffList = options.MnDiffList;
  this.command = 'mndifflist';
  $.checkArgument(
    _.isUndefined(arg) || arg instanceof this.MnDiffList,
    'An instance of MnDiffList or undefined is expected'
  );
  this.mnDiffList = arg;
}
inherits(MnDiffListMessage, Message);

MnDiffListMessage.prototype.setPayload = function (payload) {
  $.checkArgument(BufferUtil.isBuffer(payload));
  this.mnDiffList = this.MnDiffList.fromBuffer(payload);
};

MnDiffListMessage.prototype.getPayload = function () {
  return this.mnDiffList ? this.mnDiffList.toBuffer() : BufferUtil.EMPTY_BUFFER;
};

module.exports = MnDiffListMessage;
