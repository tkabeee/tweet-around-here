"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("../constants/AppConstants");
var assign = require("object-assign");

var AppStore = assign({}, EventEmitter.prototype, {

});

AppDispatcher.register(function(action) {

});

module.exports = AppStore;