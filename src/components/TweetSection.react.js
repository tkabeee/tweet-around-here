"use strict"

var React = require("react")
import createReactClass from 'create-react-class'

var TweetList = require("./TweetList.react");

var TweetSection = createReactClass({

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