"use strict";

var React = require("react");

var Header = require("./Header.react.jsx");
var Tweets = require("./Tweets.react.jsx");
var Map = require("./Map.react.jsx");

var App = React.createClass({

  render: function() {
    console.log('header');
    return (

      <div>
        <Header />
        <div id="container">

          <div id="leftSide">
            <div id="tweets">
              <Tweets />
            </div>
          </div>

          <div id="mainContent">
            <Map />
            <div id="positionInfo">
              <p className="latlng">Lat：<span id="lat"></span>&nbsp;&nbsp;&nbsp;Lng：<span id="lng"></span></p>
              <p className="address"><span id="address">Address 取得中…</span></p>
            </div>
            <div className="link">develop by <a href="//github.com/tkabeee" target="_blank">tkabee</a>. ＠<a href="//twitter.com/TweetAroundHere" target="_blank">TweetAroundHere</a></div>
          </div>

        </div>
      </div>

    );
  }

});

module.exports = App;