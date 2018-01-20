"use strict";

// import { ReduceStore } from "flux/utils";
import EventEmitter from "events";

import ActionTypes from "../constants/AppActionTypes";
import AppDispatcher from "../dispatcher/AppDispatcher";
import SearchConstants from "../constants/SearchConstants";

var CHANGE_EVENT = "change";

const appState = {
  query: SearchConstants.INIT_QUERY,
  lat: SearchConstants.INIT_LAT,
  lng: SearchConstants.INIT_LNG,
  within: SearchConstants.INIT_WITHIN,
  rpp: SearchConstants.INIT_RPP,
  zoom: SearchConstants.INIT_ZOOM,
  requestUrl: SearchConstants.REQUEST_URL,
  units: SearchConstants.UNITS,
  tweet: []
};

class AppStore extends EventEmitter {

  constructor() {
    super();
  }

  getState() {
    return appState;
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

const appStoreInstance = new AppStore();

appStoreInstance.dispatchToken = AppDispatcher.register((action) => {

  switch(action.type) {
    case ActionTypes.UPDATE_QUERY:
      appState.query = action.query;
      break;

    case ActionTypes.UPDATE_LAT_LNG:
      appState.lat = parseFloat(action.lat);
      appState.lng = parseFloat(action.lng);
      break;

    case ActionTypes.UPDATE_DISTANCE:
      appState.within = parseInt(action.distance);
      break;

    case ActionTypes.UPDATE_ZOOM:
      appState.zoom = parseInt(action.zoom);
      break;

    case ActionTypes.UPDATE_TWEET:
      appState.tweet = action.tweet;
      break;

    default:
      return;
  }

  appStoreInstance.emitChange();
});

export default appStoreInstance;