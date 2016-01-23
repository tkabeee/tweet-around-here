"use strict";

var React = require("react");
var SearchForm = require("./SearchForm.react");

var SearchSection = React.createClass({

  propTypes: {
    states: React.PropTypes.object.isRequired,
    onSearchTweet: React.PropTypes.func.isRequired
  },

  componentDidMount: function() {
    this._loadTweetsFromServer();
  },

  _loadTweetsFromServer: function() {
    var states = this.props.states;
    var params = {
      query: states.query.trim(),
      geocode: this._handleFormatGeocode(states.lat, states.lng, states.within, states.units),
      rpp: states.rpp,
      zoom: states.zoom
    };

    this._handleSearchSubmit(params);
  },

  _handleFormatGeocode: function(lat,lng,within,units) {
    return lat + ',' + lng + ',' + within + units;
  },

  _handleSearchSubmit: function(params) {
    this.props.onSearchTweet(params);
  },

  render: function() {
    console.log(this.props.states);
    var states = this.props.states;
    return (
      <div id="searchSection">
        <SearchForm
          query={states.query}
          lat={states.lat}
          lng={states.lng}
          within={states.within}
          rpp={states.rpp}
          zoom={states.zoom}
          distances={states.distances}
          units={states.units}
          formatGeocode={this._handleFormatGeocode}
          onSearchSubmit={this._handleSearchSubmit}
        />
      </div>
    );
  }

});

module.exports = SearchSection;