"use strict";

var React = require("react");
var SearchForm = require("./SearchForm.react");

var SearchSection = React.createClass({

  propTypes: {
    states: React.PropTypes.object.isRequired
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
    var self = this;
    $.ajax({
      url: this.props.states.requestUrl,
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
          // console.log(data.statuses[i]);
          // console.log('name: '+data.statuses[i].user.name);
          // console.log('screen_name: @'+data.statuses[i].user.screen_name);
          // console.log('created_at: '+data.statuses[i].created_at);
          // console.log('text: '+data.statuses[i].text);
        }

        // TODO: レスポンスをツイート変数に代入する
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(self.props.states.requestUrl, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
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