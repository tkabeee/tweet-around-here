"use strict";

import React from "react";
import createReactClass from "create-react-class";

import AppStore from "../stores/AppStore";
import MapCanvas from "./MapCanvas";

export default class MapSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="mapSection" className="map-section">
        {this.props.children}
        <div id="positionInfo">
          <p className="latlng">
            Lat:&nbsp;<span id="lat">{this.props.lat}</span>&nbsp;&nbsp;
            Lng:&nbsp;<span id="lng">{this.props.lng}</span>
          </p>
          <p className="address">
            <span id="address">Address 取得中…</span>
          </p>
        </div>
        <div className="link">develop by <a href="//github.com/tkabeee" target="_blank">tkabee</a>. ＠<a href="//twitter.com/TweetAroundHere" target="_blank">TweetAroundHere</a></div>
      </div>
    );
  }
}

MapSection.propsTypes = {
  lat: React.PropTypes.string,
  lng: React.PropTypes.string,
};
