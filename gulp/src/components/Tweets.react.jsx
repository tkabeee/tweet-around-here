var React = require("react");

var Tweets = React.createClass({

  render: function() {
    return (

      <ol className="stream-list">
        <li className="stream-list-item">
          <div className="tweet">
            <div className="content">
              <div className="stream-item-header">
                <a className="account-group" href="/this.state.user.screen_name">
                  <img className="profile-avatar" src="this.state.user.profile_image_url" />
                  <strong className="fullname">this.state.user.name</strong><span className="username"><s>@</s><b>this.state.user.screen_name</b></span>
                </a>
                <small className="time">
                  <a href="//twitter.com/this.state.user.screen_name/status/this.state.id_str" className="tweet-timestamp">
                    <span className="timestamp">this.state.created_at</span>
                  </a>
                </small>
              </div>
              <p className="tweet-text">this.state.text</p>
            </div>
          </div>
        </li>
      </ol>

    );
  }

});

module.exports = Tweets;