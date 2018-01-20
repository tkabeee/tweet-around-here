"use strict";

import React from "react";
import createReactClass from "create-react-class";

import AppActions from "../actions/AppActions";
import AppStore from "../stores/AppStore";
import SearchSection from "./SearchSection.react";
import TweetSection from "./TweetSection.react";
import MapSection from "./MapSection";

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

  _handleSearchTweet() {
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
      // context: document.body,
      success: function(data) {
        // for(var i in data.statuses) {
        //   console.log(data.statuses[i]);
        //   console.log("name: "+data.statuses[i].user.name);
        //   console.log("screen_name: @"+data.statuses[i].user.screen_name);
        //   console.log("created_at: "+data.statuses[i].created_at);
        //   console.log("text: "+data.statuses[i].text);
        // }
        AppActions.updateTweet(data.statuses);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.state.requestUrl, status, err.toString());
      }.bind(this)
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
            {/* <TweetSection tweet={this.state.tweet} /> */}
          </div>
          <div id="mainContent">
            <MapSection
              lat={this.state.lat}
              lng={this.state.lng}
            />
          </div>
        </div>
      </div>
    );
  }
}