"use strict";

var React = require("react");

var Header = require("./Header.react.jsx");

var App = React.createClass({

  render: function() {
    console.log('header');
    return (

      <Header />

    );
  }

});

module.exports = App;