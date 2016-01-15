var React = require("react");
var ReactPropsTypes = React.PropTypes;

var AppStore = require("../stores/AppStore");

function getStateFromStores() {
}

var SearchForm = React.createClass({

  PropTypes: {
    distances: ReactPropsTypes.array,
    units: ReactPropsTypes.string,
    onSubmit: ReactPropsTypes.func
  },

  getDefaultProps: function() {
    return {
      distances: [2, 5, 10, 20, 30, 40, 50, 100],
      units: "km",
      onSubmit: this._handleSubmit,
    };
  },

  getInitialState: function() {
    return getStateFromStores();
  },

  _handleSubmit: function(e) {
    e.preventDefault();
    var query = this.state.query.trim();
    var distance = this.state.distance;
    var rpp = this.state.rpp;
    var zoom = this.state.zoom;
    if (!distance || !rpp || !zoom) {
      return;
    }
    // this.props.onSearchSubmit({
    //   query: query,
    //   distance: distance,
    //   rpp: rpp,
    //   zoom: zoom
    // });
    // this.setState({
    //   query: query,
    //   distance: distance,
    //   rpp: rpp,
    //   zoom: zoom
    // });
  },

  render: function() {
    return (

      <div id="searchForm" className="search">
        <form name="form" method="get" onSubmit={this._handleSubmit}>
          半径
          <select id="geocode" name="geocode" value={this.state.distance} onChange={this._handleDistanceChange}>
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

module.exports = SearchBox;