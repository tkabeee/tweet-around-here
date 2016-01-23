var React = require("react");
var AppActions = require("../actions/AppActions");

var SearchForm = React.createClass({

  PropTypes: {
    query: React.PropTypes.string,
    lat: React.PropTypes.number.isRequired,
    lng: React.PropTypes.number.isRequired,
    rpp: React.PropTypes.number.isRequired,
    zoom: React.PropTypes.number.isRequired,
    within: React.PropTypes.number.isRequired,
    distances: React.PropTypes.array.isRequired,
    units: React.PropTypes.string,
    formatGeocode: React.PropTypes.func.isRequired,
    onSearchSubmit: React.PropTypes.func.isRequired
  },

  _handleQueryChange: function(e) {
    // this.setState({query: e.target.value});
    AppActions.updateQuery(e.target.value);
  },

  _handleWithinChange: function(e) {
    // this.setState({within: e.target.value});
    AppActions.updateDistance(e.target.value);
  },

  _handleSubmit: function(e) {
    e.preventDefault();
    var query = this.props.query.trim();
    var geocode = this.props.formatGeocode(this.props.lat,this.props.lng,this.props.within,this.props.units);
    var rpp = this.props.rpp;
    var zoom = this.props.zoom;
    if (!geocode || !rpp || !zoom) {
      return;
    }
    this.props.onSearchSubmit({
      query: query,
      geocode: geocode,
      rpp: rpp,
      zoom: zoom
    });
  },

  render: function() {
    var self = this;
    var selectOptions = this.props.distances.map(function(distance) {
      return <option className="distance" key={distance} value={distance}>&nbsp;&nbsp;&nbsp;{distance}&nbsp;</option>;
    });
    var queryPlaceholder = '例）あけおめ';
    return (
      <div id="searchForm" className="search">
        <form name="form" method="get" onSubmit={this._handleSubmit}>
          半径
          <select id="within" name="within" defaultValue={this.props.within} onChange={this._handleWithinChange}>
            {selectOptions}
          </select>
          &nbsp;km&nbsp;圏内&nbsp;&nbsp;
          <span className="search-word">
            <input type="text" id="query" name="q" value={this.props.query} placeholder={queryPlaceholder} onChange={this._handleQueryChange} style={{width: 230 + 'px'}} />
          </span>
          &nbsp;
          <input type="hidden" id="rpp" name="rpp" value={this.props.rpp} />
          <input type="hidden" id="zoom" name="zoom" value={this.props.zoom} />
          <button id="submit_post"> 検 索 </button>
        </form>
      </div>
    );
  }

});

module.exports = SearchForm;