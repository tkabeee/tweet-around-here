"use strict";

var React = require("react");
var TweetList = require("./TweetList.react");

var TweetSection = React.createClass({

  render: function() {
    return (
      <div id="tweetsSection" className="tweet-section">
        <div id="tweets">
          <TweetList tweetData={this.props.tweet} />
        </div>
      </div>
    );
  }
});

module.exports = TweetSection;