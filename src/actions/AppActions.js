"use strict";

var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants");

var AppActions = {

  updateQuery: function(query) {
    AppDispatcher.dispatch({
      actionType: AppConstants.UPDATE_QUERY,
      query: query
    });
  },

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

  updateTweet: function(data) {
    AppDispatcher.dispatch({
      actionType: AppConstants.UPDATE_TWEET,
      tweet: data
    });
  }

};

module.exports = AppActions;