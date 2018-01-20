"use strict";

import React from "react";

export default class TweetSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="tweetsSection" className="tweet-section">
        <div id="tweets">
          {this.props.children}
        </div>
      </div>
    );
  }
}