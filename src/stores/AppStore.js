"use strict";

// import { ReduceStore } from "flux/utils";
import EventEmitter from "events";

import ActionTypes from "../constants/AppActionTypes";
import AppDispatcher from "../dispatcher/AppDispatcher";
import SearchConstants from "../constants/SearchConstants";

var CHANGE_EVENT = "change";

const _state = {
  query: SearchConstants.INIT_QUERY,
  lat: SearchConstants.INIT_LAT,
  lng: SearchConstants.INIT_LNG,
  within: SearchConstants.INIT_WITHIN,
  rpp: SearchConstants.INIT_RPP,
  zoom: SearchConstants.INIT_ZOOM,
  requestUrl: SearchConstants.REQUEST_URL,
  distances: SearchConstants.DISTANCES,
  units: SearchConstants.UNITS,
  tweet: []
};

class AppStore extends EventEmitter {

  constructor() {
    super();
  }

  getState() {
    return _state;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

// Register callback to handle all updates
AppDispatcher.register((action) => {

  switch(action.type) {
    case ActionTypes.UPDATE_QUERY:
      _state.query = action.query;
      break;

    case ActionTypes.UPDATE_LAT_LNG:
      _state.lat = parseFloat(action.lat);
      _state.lng = parseFloat(action.lng);
      break;

    case ActionTypes.UPDATE_DISTANCE:
      _state.within = parseInt(action.distance);
      break;

    case ActionTypes.UPDATE_ZOOM:
      _state.zoom = parseInt(action.zoom);
      break;

    case ActionTypes.UPDATE_TWEET:
      _state.tweet = action.tweet;
      break;

    default:
      return;
  }

  appStoreInstance.emitChange();
});

const appStoreInstance = new AppStore();
export default appStoreInstance;