'use strict';

var Message = require('../message');
var inherits = require('util').inherits;
var bitcore = require('@dashevo/dashcore-lib');
var BufferUtil = bitcore.util.buffer;
var $ = bitcore.util.preconditions;
var _ = bitcore.deps._;

/**
 * Contains information about a GetMnListDiffMessage
 * @param {GetMnListDiffMessage} arg - An instance of GetMnListDiffMessage
 * @param {Object=} options
 * @param {Function} options.MnListDiff - a GetMnListDiffMessage constructor
 * @extends Message
 * @constructor
 */
function GetMnListDiffMessage(arg, options) {
  Message.call(this, options);
  this.GetMnListDiffMessage = options.GetMnListDiffMessage;
  this.command = 'getmnlistdiff';
  $.checkArgument(
    _.isUndefined(arg) || arg instanceof this.GetMnListDiffMessage,
    'An instance of GetMnListDiffMessage or undefined is expected'
  );
  this.getmnlistdiff = arg;
}
inherits(GetMnListDiffMessage, Message);

GetMnListDiffMessage.prototype.setPayload = function (payload) {
  $.checkArgument(BufferUtil.isBuffer(payload));
  this.getmnlistdiff = this.GetMnListDiffMessage.fromBuffer(payload);
};

GetMnListDiffMessage.prototype.getPayload = function () {
  return this.getmnlistdiff ? this.getmnlistdiff.toBuffer() : BufferUtil.EMPTY_BUFFER;
};

module.exports = GetMnListDiffMessage;
