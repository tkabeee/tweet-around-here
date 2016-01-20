"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants");

var AppActions = {

  updateLatLng: function(lat, lng) {
    AppDispatcher.dispatch({
      actionType: AppConstants.UPDATE_LAT_LNG,
      lat: lat,
      lng: lng
    });
  },

  updateDistance: function(distance) {
    AppDispatcher.dispatch({
      actionType: AppConstants.UPDATE_DISTANCE,
      distance: distance
    });
  },

  updateZoom: function(zoom) {
    AppDispatcher.dispatch({
      actionType: AppConstants.UPDATE_ZOOM,
      zoom: zoom
    });
  },

  updateTweets: function(data) {
    AppDispatcher.dispatch({
      actionType: AppConstants.UPDATE_TWEETS,
      data: data
    });
  }

};

module.exports = AppActions;