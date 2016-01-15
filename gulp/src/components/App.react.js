"use strict";

var React = require("react");
var SearchSection = require("./SearchSection.react");
var TweetsSection = require("./TweetListItem.react");
var MapSection = require("./MapSection.react");

var App = React.createClass({

  render: function() {
    return (
      <div className="">
        <header>
          <h1><a href="//tkabeee.github.io/tweetaroundhere" target="_self">Tweet Around Here</a></h1>
          <SearchSection />
        </header>
        <div id="container">
          <div id="leftSide">
            <TweetsSection />
          </div>
          <div id="mainContent">
            <MapSection />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = App;