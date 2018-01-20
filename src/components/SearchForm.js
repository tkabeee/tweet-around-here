"use strict";

import React from "react";

import AppActions from "../actions/AppActions";
import SearchConstants from "../constants/SearchConstants";

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.placeholder = "tweetを検索";
  }

  handleQueryFocus(e) {
    if (e.target.classList.contains("focused")) {
      return;
    }
    e.target.classList.add("focused");
  }

  handleQueryBlur(e) {
    if (e.target.classList.contains("focused")) {
      e.target.classList.remove("focused");
    }
  }

  handleQueryChange(e) {
    AppActions.updateQuery(e.target.value);
  }

  handleWithinChange(e) {
    AppActions.updateDistance(e.target.value);
    this.props.onSearchTweet();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSearchTweet();
  }

  render() {
    return (
      <div id="searchForm" className="search">
        <form name="form" method="get" onSubmit={(e) => this.handleSubmit(e)}>
          <span className="search-distance">
            <input
              id="within"
              type="range"
              name="within"
              min={SearchConstants.MIN_CIRCLE_RANGE}
              max={SearchConstants.MAX_CIRCLE_RANGE}
              defaultValue={this.props.within}
              onChange={(e) => this.handleWithinChange(e)}
            />
          </span>
          <span className="search-word">
            <input
              type="text"
              id="query"
              name="q"
              value={this.props.query}
              placeholder={this.placeholder}
              onFocus={(e) => this.handleQueryFocus(e)}
              onBlur={(e) => this.handleQueryBlur(e)}
              onChange={(e) => this.handleQueryChange(e)}
              style={{width: 230 + "px"}}
            />
          </span>
          <span className="search-submit">
            <button id="submit_post"> 検 索 </button>
          </span>
        </form>
      </div>
    );
  }
}

SearchForm.PropTypes = {
  query: React.PropTypes.string,
  rpp: React.PropTypes.number.isRequired,
  zoom: React.PropTypes.number.isRequired,
  within: React.PropTypes.number.isRequired,
  onSearchSubmit: React.PropTypes.func.isRequired
};