"use strict";

var React = require("react");
var MapCanvas = require("./MapCanvas.react");

var MapSection = React.createClass({

  render: function() {
    return (
      <div id="mapSection">
        <MapCanvas />
        <div id="positionInfo">
          <p className="latlng">Lat：<span id="lat"></span>&nbsp;&nbsp;&nbsp;Lng：<span id="lng"></span></p>
          <p className="address"><span id="address">Address 取得中…</span></p>
        </div>
        <div className="link">develop by <a href="//github.com/tkabeee" target="_blank">tkabee</a>. ＠<a href="//twitter.com/TweetAroundHere" target="_blank">TweetAroundHere</a></div>
      </div>
    );
  }
});

module.exports = MapSection;