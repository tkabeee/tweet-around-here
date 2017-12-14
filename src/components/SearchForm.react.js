"use strict"

var React = require("react");
var AppActions = require("../actions/AppActions");
import PropTypes from 'prop-types'

var SearchForm = React.createClass({

  PropTypes: {
    query: PropTypes.string,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    rpp: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
    within: PropTypes.number.isRequired,
    distances: PropTypes.array.isRequired,
    units: PropTypes.string,
    formatGeocode: PropTypes.func.isRequired,
    onSearchSubmit: PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      placeholder: "tweetを検索"
    };
  },

  _handleQueryFocus: function(e) {
    if (e.target.classList.contains("focused")) {
      return;
    }
    e.target.classList.add("focused");
  },

  _handleQueryBlur: function(e) {
    if (e.target.classList.contains("focused")) {
      e.target.classList.remove("focused");
    }
    // self.val(placeHolder).removeClass("focused");
  },

  _handleQueryChange: function(e) {
    // this.setState({query: e.target.value});
    AppActions.updateQuery(e.target.value);
  },

  _handleWithinChange: function(e) {
    // this.setState({within: e.target.value});
    AppActions.updateDistance(e.target.value);
    // this.props.onFormSubmit();
  },

  _handleSubmit: function(e) {
    e.preventDefault();
    this.props.onFormSubmit();
  },

  render: function() {
    var self = this;
    var selectOptions = this.props.distances.map(function(distance) {
      return <option className="distance" key={distance} value={distance}>&nbsp;&nbsp;&nbsp;{distance}&nbsp;</option>;
    });
    var queryPlaceholder = this.state.placeholder;
    return (
      <div id="searchForm" className="search">
        <form name="form" method="get" onSubmit={this._handleSubmit}>
          <span className="search-distance">
            <input id="within" type="range" name="within" min="2" max="100" defaultValue={this.props.within} onChange={this._handleWithinChange} />
          </span>
          <span className="search-word">
            <input type="text" id="query" name="q" value={this.props.query} placeholder={queryPlaceholder} onFocus={this._handleQueryFocus} onBlur={this._handleQueryBlur} onChange={this._handleQueryChange} style={{width: 230 + 'px'}} />
          </span>
          <span className="search-submit">
            <button id="submit_post"> 検 索 </button>
          </span>
          <input type="hidden" id="rpp" name="rpp" value={this.props.rpp} />
          <input type="hidden" id="zoom" name="zoom" value={this.props.zoom} />
        </form>
      </div>
    );
  }

});

module.exports = SearchForm;