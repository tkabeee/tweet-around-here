"use strict";

import React from "react";

import AppActions from "../actions/AppActions";
import AppStore from "../stores/AppStore";
import SearchSection from "./SearchSection.react";
import TweetSection from "./TweetSection";
import TweetList from "./TweetList";
import MapSection from "./MapSection";
import MapCanvas from "./MapCanvas";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = AppStore.getState();
  }

  componentDidMount() {
    AppStore.addChangeListener(() => {
      this.setState(AppStore.getState);
    });
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(() => {
      this.setState(AppStore.getState);
    });
  }

  handleSearchTweet() {
    var params = {
      query: this.state.query.trim(),
      geocode: this.state.lat + "," + this.state.lng + "," + this.state.within + this.state.units,
      rpp: this.state.rpp
    };
    $.ajax({
      url: this.state.requestUrl,
      method: "POST",
      dataType: "json",
      cache: false,
      data: {
        q: decodeURI(params.query),
        geocode: params.geocode,
        count: params.rpp
      },
      success: (data) => {
        AppActions.updateTweet(data.statuses);
      },
      error: (xhr, status, err) => {
        console.error(this.state.requestUrl, status, err.toString());
      }
    });
  }

  render() {
    return (
      <div className="">
        <header>
          <div className="header-left">
            <h1><a href="//tkabeee.github.io/tweet-around-here" target="_self">Tweet Around Here</a></h1>
          </div>
          {/* <SearchSection states={this.state} onSearchTweet={this._handleSearchTweet} /> */}
        </header>
        <div id="container">
          <div id="leftSide">
            <TweetSection>
              <TweetList
                tweet={this.state.tweet}
              >
              </TweetList>
            </TweetSection>
          </div>
          <div id="mainContent">
            <MapSection
              lat={this.state.lat}
              lng={this.state.lng}
            >
              <MapCanvas
                lat={this.state.lat}
                lng={this.state.lng}
                zoom={this.state.zoom}
                within={this.state.within}
                onSearchTweet={() => this.handleSearchTweet()}
              />
            </MapSection>
          </div>
        </div>
      </div>
    );
  }
}