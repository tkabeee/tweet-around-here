"use strict";

var React = require("react");
var SearchForm = require("./SearchForm.react");

var SearchSection = React.createClass({

  render: function() {
    return (
      <div id="searchSection">
        <SearchForm />
      </div>

    );
  }

});

module.exports = SearchSection;