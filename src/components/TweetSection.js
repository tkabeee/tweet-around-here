"use strict";

import React from "react";

export default class TweetSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const children = this.props.children;
    if (children.props.tweet.length > 0) {
      return (
        <div id="tweetsSection" className="tweet-section">
          <div id="tweets">
            {children}
          </div>
        </div>
      );
    }

    const styleContainer = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%"
    };

    const styleSpinner = {
      fontSize: "3em",
      color: "Tomato"
    };

    return (
      <div style={styleContainer}>
        <div style={styleSpinner}>
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      </div>
    );
  }
}