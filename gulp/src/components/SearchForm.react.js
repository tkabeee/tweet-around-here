var React = require("react");

var SearchForm = React.createClass({

  PropTypes: {
    query: React.PropTypes.string,
    lat: React.PropTypes.number.isRequired,
    lng: React.PropTypes.number.isRequired,
    rpp: React.PropTypes.number.isRequired,
    zoom: React.PropTypes.number.isRequired,
    within: React.PropTypes.number.isRequired,
    distances: React.PropTypes.array.isRequired,
    // units: React.PropTypes.string,
    formatGeocode: React.PropTypes.func.isRequired,
    onSearchSubmit: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      query: this.props.query,
      lat: this.props.lat,
      lng: this.props.lng,
      rpp: this.props.rpp,
      zoom: this.props.zoom,
      within: this.props.within
    };
  },

  _handleQueryChange: function(e) {
    this.setState({query: e.target.value});
  },

  _handleWithinChange: function(e) {
    this.setState({within: e.target.value});
  },

  _handleSubmit: function(e) {
    e.preventDefault();
    var query = this.state.query.trim();
    var geocode = this.props.formatGeocode(this.state.lat,this.state.lng,this.state.within,this.props.units);
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
      return <option className="distance" key={distance} value={distance}>&nbsp;&nbsp;&nbsp;{distance}&nbsp;</option>;
    });
    var queryPlaceholder = '例）あけおめ';
    return (
      <div id="searchForm" className="search">
        <form name="form" method="get" onSubmit={this._handleSubmit}>
          半径
          <select id="within" name="within" value={this.state.within} onChange={this._handleWithinChange}>
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