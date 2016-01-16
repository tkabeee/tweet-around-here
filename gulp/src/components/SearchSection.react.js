"use strict";

var React = require("react");
var SearchForm = require("./SearchForm.react");

var SearchSection = React.createClass({

  propTypes: {
    searchStates: React.PropTypes.object.isRequired
  },

  componentDidMount: function() {
    this._loadTweetsFromServer();
  },

  _loadTweetsFromServer: function() {
    // TODO: 初期検索を実行する
  },

  _handleSearchSubmit: function(params) {
    var self = this;
    $.ajax({
      url: this.props.searchStates.requestUrl,
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
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(self.props.searchStates.requestUrl, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    var states = this.props.searchStates;
    return (
      <div id="searchSection">
        <SearchForm
          query={states.query}
          lat={states.lat}
          lng={states.lng}
          rpp={states.rpp}
          zoom={states.zoom}
          distances={states.distances}
          distance={states.distance}
          units={states.units}
          onSearchSubmit={this._handleSearchSubmit}
        />
      </div>
    );
  }

});

module.exports = SearchSection;