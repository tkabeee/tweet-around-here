"use strict";

var React = require("react");
var AppStore = require("../stores/AppStore");
var SearchSection = require("./SearchSection.react");
var TweetsSection = require("./TweetListItem.react");
var MapSection = require("./MapSection.react");

function getStateFromStores() {
  return {
    searchStates: AppStore.getAll()
  }
}

var App = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componetDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  render: function() {
    return (
      <div className="">
        <header>
          <h1><a href="//tkabeee.github.io/tweetaroundhere" target="_self">Tweet Around Here</a></h1>
          <SearchSection searchStates={this.state.searchStates} />
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