"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("../constants/AppConstants");
var SearchConstants = require("../constants/SearchConstants");
var assign = require("object-assign");

var CHANGE_EVENT = 'change';

var _state = {
  query: SearchConstants.INIT_QUERY,
  lat: SearchConstants.INIT_LAT,
  lng: SearchConstants.INIT_LNG,
  within: SearchConstants.INIT_WITHIN,
  rpp: SearchConstants.INIT_RPP,
  zoom: SearchConstants.INIT_ZOOM,
  requestUrl: SearchConstants.REQUEST_URL,
  distances: SearchConstants.DISTANCES,
  units: SearchConstants.UNITS
};

var AppStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _state;
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

});

module.exports = AppStore;