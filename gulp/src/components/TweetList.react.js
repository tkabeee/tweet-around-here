var React = require("react");

var TweetList = React.createClass({

  render: function() {
    var tweetListItems = this.props.tweetData.map(function(data) {
      var baseHref = "//twitter.com/";
      return (
        <li className="stream-list-item">
          <div className="tweet">
            <div className="content">
              <div className="stream-item-header">
                <a className="account-group" href={baseHref + data.user.screen_name}>
                  <img className="profile-avatar" src={data.user.profile_image_url} />
                  <strong className="fullname">{data.user.name}</strong><span className="username"><s>@</s><b>{data.user.screen_name}</b></span>
                </a>
                <small className="time">
                  <a href="//twitter.com/{data.user.screen_name}/status/{data.id_str}" className="tweet-timestamp">
                    <span className="timestamp">{data.created_at}</span>
                  </a>
                </small>
              </div>
              <p className="tweet-text">{data.text}</p>
            </div>
          </div>
        </li>
      );
    });
    return (
      <ol className="stream-list">
        {tweetListItems}
      </ol>
    );
  }

});

module.exports = TweetList;