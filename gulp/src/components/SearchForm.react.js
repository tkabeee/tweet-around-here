var React = require("react");

var SearchForm = React.createClass({

  PropTypes: {
    query: React.PropTypes.string,
    lat: React.PropTypes.number.isRequired,
    lng: React.PropTypes.number.isRequired,
    rpp: React.PropTypes.number.isRequired,
    zoom: React.PropTypes.number.isRequired,
    distance: React.PropTypes.number.isRequired,
    distances: React.PropTypes.array.isRequired,
    // units: React.PropTypes.string,
    onSearchSubmit: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      query: this.props.query,
      lat: this.props.lat,
      lng: this.props.lng,
      rpp: this.props.rpp,
      zoom: this.props.zoom,
      distance: this.props.distance,
      geocode: this._formatGeocode(this.props.lat,this.props.lng,this.props.distance,this.props.units)
    };
  },

  _formatGeocode: function(lat,lng,distance,units) {
    return lat + ',' + lng + ',' + distance + units;
  },

  _handleQueryChange: function(e) {
    this.setState({query: e.target.value});
  },

  _handleGeocodeChange: function(e) {
    this.setState({geocode: e.target.value});
  },

  _handleSubmit: function(e) {
    e.preventDefault();
    var query = this.state.query.trim();
    var geocode = this.state.geocode;
    var rpp = this.state.rpp;
    var zoom = this.state.zoom;
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
      var geocode = self._formatGeocode(self.state.lat, self.state.lng, distance, self.props.units);
      return <option className="geo" key={distance} value={geocode}>&nbsp;&nbsp;&nbsp;{distance}&nbsp;</option>;
    });
    var queryPlaceholder = '例）あけおめ';
    return (
      <div id="searchForm" className="search">
        <form name="form" method="get" onSubmit={this._handleSubmit}>
          半径
          <select id="geocode" name="geocode" value={this.state.geocode} onChange={this._handleGeocodeChange}>
            {selectOptions}
          </select>
          &nbsp;km&nbsp;圏内&nbsp;&nbsp;
          <span className="search-word">
            <input type="text" id="query" name="q" value={this.state.query} placeholder={queryPlaceholder} onChange={this._handleQueryChange} style={{width: 230 + 'px'}} />
          </span>
          &nbsp;
          <input type="hidden" id="rpp" name="rpp" value={this.state.rpp} />
          <input type="hidden" id="zoom" name="zoom" value={this.state.zoom} />
          <button id="submit_post"> 検 索 </button>
        </form>
      </div>
    );
  }

});

module.exports = SearchForm;