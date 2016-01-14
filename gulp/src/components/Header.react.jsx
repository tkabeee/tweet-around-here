var React = require("react");
var SearchBox = require("../components/SearchBox.react.jsx");

var Header = React.createClass({

  render: function() {
    return (

      <header>
        <h1><a href="//tkabeee.github.io/tweetaroundhere" target="_self">Tweet Around Here</a></h1>
        <SearchBox />
      </header>

    );
  }

});

module.exports = Header;