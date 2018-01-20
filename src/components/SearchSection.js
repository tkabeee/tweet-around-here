"use strict";

import React from "react";

export default class SearchSection extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onSearchTweet();
  }

  render() {
    return (
      <div id="searchSection" className="search-section">
        {this.props.children}
      </div>
    );
  }
}

SearchSection.propTypes = {
  onSearchTweet: React.PropTypes.func.isRequired
};
