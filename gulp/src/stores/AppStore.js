"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var AppConstants = require("../constants/AppConstants");
var SearchConstants = require("../constants/SearchConstants");
var assign = require("object-assign");

var CHANGE_EVENT = 'change';

var _state = {
  // TODO: 初期値の定義はここでするのか？
  query: SearchConstants.INIT_QUERY,
  lat: SearchConstants.INIT_LAT,
  lng: SearchConstants.INIT_LNG,
  within: SearchConstants.INIT_WITHIN,
  rpp: SearchConstants.INIT_RPP,
  zoom: SearchConstants.INIT_ZOOM,
  requestUrl: SearchConstants.REQUEST_URL,
  distances: SearchConstants.DISTANCES,
  units: SearchConstants.UNITS,
};

function update(key, val) {
  _state[key] = val;
}

function updateQuery(query) {
  update('query', query);
  console.log('updateQuery: ' + query);
}

function updateLatLng(lat, lng) {
  update('lat', parseFloat(lat));
  update('lng', parseFloat(lng));
  console.log('updateLatLng: ' + lat + ',' + lng);
}

function updateDistance(distance) {
  update('within', parseInt(distance));
  console.log('updateDistance: ' + distance);
}

function updateZoom(zoom) {
  update('zoom', parseInt(zoom));
  console.log('updateZoom: ' + zoom);
}

function updateTweet(tweet) {
  update('tweet', tweet);
  console.log('updateTweet: ' + tweet);
}

var AppStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _state;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
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

  switch(action.actionType) {
    case AppConstants.UPDATE_QUERY:
      updateQuery(action.query);
      AppStore.emitChange();
      break;

    case AppConstants.UPDATE_LAT_LNG:
      updateLatLng(action.lat, action.lng);
      AppStore.emitChange();
      break;

    case AppConstants.UPDATE_DISTANCE:
      updateDistance(action.distance);
      AppStore.emitChange();
      break;

    case AppConstants.UPDATE_ZOOM:
      updateZoom(action.zoom);
      AppStore.emitChange();
      break;

    case AppConstants.UPDATE_TWEET:
      updateTweet(action.tweet);
      AppStore.emitChange();
      break;

    default:
  }

});

module.exports = AppStore;