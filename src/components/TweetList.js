"use strict";

var React = require("react");

export default class TweetList extends React.Component {

  replaceTweetLink(txt) {
    return txt.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&amp;%@!&#45;\\/]))?)/g,"<a href=\"$1:\">$1</a>")
      .replace(/(^|\s)(@|＠)(\w+)/g,"$1<a href='http://www.twitter.com/$3'>@$3</a>")
      .replace(/(?:^|[^ーー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9&_/>]+)[#＃]([ー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9_]*[ー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z]+[ー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9_]*)/ig, " <a href=\"http://twitter.com/search?q=%23$1\">#$1</a>")
      .replace(/[\n\r]/g, "<br>");
  }

  formatTimestamp(a) {
    var b = new Date,
      c = parseInt((b.getTime() - Date.parse(a)) / 1E3),
      d = "";
    if (c < 60) {
      d += c + "秒" + (c == 1 ? "" : "") + "前";
    }
    else if (c < 3600) {
      b = parseInt((c + 30) / 60);
      d += b + "分" + (b == 1 ? "" : "") + "前";
    }
    else if (c < 86400) {
      b = parseInt((c + 1800) / 3600);
      d += b + "時間" + (b == 1 ? "" : "") + "前";
    }
    else
    {
      a = new Date(a);
      a.getHours();
      a.getMinutes();
      if (a.getFullYear() < b.getFullYear()) {
        d += a.getFullYear() + "年";
      }
      d += ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"][a.getMonth()] + a.getDate() + "日";
      // b = parseInt((c + 43200) / 86400);
      // d += " (" + b + "日" + (b == 1 ? "" : "s") + "前)"
    }
    return d;
  }

  render() {
    const baseHref = "//twitter.com/";
    const tweetListItems = this.props.tweet.map((data, index) => {
      const timestamp = this.formatTimestamp(data.created_at);
      const tweet = this.replaceTweetLink(data.text);
      return (
        <li key={index} className="stream-list-item">
          <div className="tweet">
            <div className="content">
              <div className="stream-item-header">
                <a className="account-group" href={baseHref + data.user.screen_name}>
                  <img className="profile-avatar" src={data.user.profile_image_url} />
                  <strong className="fullname">{data.user.name}</strong><span className="username"><s>@</s><b>{data.user.screen_name}</b></span>
                </a>
                <small className="time">
                  <a href={"//twitter.com/" + data.user.screen_name + "/status/" + data.id_str} className="tweet-timestamp">
                    <span className="timestamp">{timestamp}</span>
                  </a>
                </small>
              </div>
              <p className="tweet-text" dangerouslySetInnerHTML={{__html:tweet}}></p>
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
}