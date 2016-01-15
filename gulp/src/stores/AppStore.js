"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("../constants/AppConstants");
var assign = require("object-assign");

var _state = {
  query: AppConstants.INIT_QUERY,
  lat: AppConstants.INIT_LAT,
  lng: AppConstants.INIT_LNG,
  within: AppConstants.INIT_WITHIN,
  rpp: AppConstants.INIT_RPP,
  zoom: AppConstants.INIT_ZOOM,
};

var AppStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _state;
  },

});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

});

module.exports = AppStore;