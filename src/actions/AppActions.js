"use strict";

import AppDispatcher from "../dispatcher/AppDispatcher";
import ActionTypes from "../constants/AppActionTypes";

const AppActions = {

  updateQuery(query) {
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_QUERY,
      query: query
    });
  },

  updateLatLng(lat, lng) {
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_LAT_LNG,
      lat: lat,
      lng: lng
    });
  },

  updateDistance(distance) {
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_DISTANCE,
      distance: distance
    });
  },

  updateZoom(zoom) {
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_ZOOM,
      zoom: zoom
    });
  },

  updateTweet(data) {
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_TWEET,
      tweet: data
    });
  }

};

export default AppActions;