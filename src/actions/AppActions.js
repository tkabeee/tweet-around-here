"use strict";

import AppDispatcher from "../dispatcher/AppDispatcher";
import { ActionTypes } from "../constants/AppConstants";

var AppActions = {

  updateQuery: function(query) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.UPDATE_QUERY,
      query: query
    });
  },

  updateLatLng: function(lat, lng) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.UPDATE_LAT_LNG,
      lat: lat,
      lng: lng
    });
  },

  updateDistance: function(distance) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.UPDATE_DISTANCE,
      distance: distance
    });
  },

  updateZoom: function(zoom) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.UPDATE_ZOOM,
      zoom: zoom
    });
  },

  updateTweet: function(data) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.UPDATE_TWEET,
      tweet: data
    });
  }

};

export default AppActions