"use strict";

var React = require("react");
var AppActions = require("../actions/AppActions");
var AppStore = require("../stores/AppStore");
var SearchSection = require("./SearchSection.react");
var TweetSection = require("./TweetSection.react");
var MapSection = require("./MapSection.react");

function getStateFromStores() {
  return AppStore.getAll();
}

var App = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  _handleSearchTweet: function(params) {
    var self = this;
    $.ajax({
      url: this.state.requestUrl,
      method: "POST",
      crossDomain: true,
      dataType: "json",
      cache: false,
      data: {
        q: decodeURI(params.query),
        geocode: params.geocode
      },
      // context: document.body,
      success: function(data) {
        // for(var i in data.statuses) {
        //   console.log(data.statuses[i]);
        //   console.log('name: '+data.statuses[i].user.name);
        //   console.log('screen_name: @'+data.statuses[i].user.screen_name);
        //   console.log('created_at: '+data.statuses[i].created_at);
        //   console.log('text: '+data.statuses[i].text);
        // }
        AppActions.updateTweet(data.statuses);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(self.states.requestUrl, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div className="">
        <header>
          <h1><a href="//tkabeee.github.io/tweetaroundhere" target="_self">Tweet Around Here</a></h1>
          <SearchSection states={this.state} onSearchTweet={this._handleSearchTweet} />
        </header>
        <div id="container">
          <div id="leftSide">
            <TweetSection tweet={this.state.tweet} />
          </div>
          <div id="mainContent">
            <MapSection states={this.state} onSearchTweet={this._handleSearchTweet} />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = App;