"use strict";

var React = require("react");
var SearchForm = require("./SearchForm.react");

var SearchSection = React.createClass({

  propTypes: {
    searchStates: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return this.props.searchStates;
  },

  componentDidMount: function() {
    this._loadTweetsFromServer();
  },

  _loadTweetsFromServer: function() {
    var params = {
      query: this.state.query.trim(),
      geocode: this._handleFormatGeocode(this.state.lat, this.state.lng, this.state.distance, this.state.units),
      rpp: this.state.rpp,
      zoom: this.state.zoom
    };

    this._handleSearchSubmit(params);
  },

  _handleFormatGeocode: function(lat,lng,distance,units) {
    return lat + ',' + lng + ',' + distance + units;
  },

  _handleSearchSubmit: function(params) {
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
        // TODO: レスポンスデータを料理
        for(var i in data.statuses) {
          console.log(data.statuses[i]);
          // console.log('name: '+data.statuses[i].user.name);
          // console.log('screen_name: @'+data.statuses[i].user.screen_name);
          // console.log('created_at: '+data.statuses[i].created_at);
          // console.log('text: '+data.statuses[i].text);
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(self.state.requestUrl, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div id="searchSection">
        <SearchForm
          query={this.state.query}
          lat={this.state.lat}
          lng={this.state.lng}
          rpp={this.state.rpp}
          zoom={this.state.zoom}
          distances={this.state.distances}
          distance={this.state.distance}
          units={this.state.units}
          formatGeocode={this._handleFormatGeocode}
          onSearchSubmit={this._handleSearchSubmit}
        />
      </div>
    );
  }

});

module.exports = SearchSection;