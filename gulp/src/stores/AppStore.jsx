"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher.jsx");
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("../constants/AppConstants.jsx");
var assign = require("object-assign");

var AppStore = assign({}, EventEmitter.prototype, {

});

AppDispatcher.register(function(action) {

});

module.exports = AppStore;