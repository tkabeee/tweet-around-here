"use strict";

import React from "react";
import PropTypes from "prop-types";
import createReactClass from "create-react-class";

import AppStore from "../stores/AppStore";
import MapCanvas from "./MapCanvas";

export default class MapSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = AppStore.getState();
  }

  render() {
    return (
      <div id="mapSection" className="map-section">
        <MapCanvas />
        <div id="positionInfo">
          <p className="latlng">
            Lat:&nbsp;<span id="lat">{this.state.lat}</span>&nbsp;&nbsp;
            Lng:&nbsp;<span id="lng">{this.state.lng}</span>
          </p>
          <p className="address">
            <span id="address">Address 取得中…</span>
          </p>
        </div>
        <div className="link">develop by <a href="//github.com/tkabeee" target="_blank">tkabee</a>. ＠<a href="//twitter.com/TweetAroundHere" target="_blank">TweetAroundHere</a></div>
      </div>
    );
  }
}

// const MapSection = createReactClass({

//   propTypes: {
//     states: PropTypes.object.isRequired,
//     onSearchTweet: PropTypes.func.isRequired
//   },

//   _handleSearchTweet: function() {
//     // TODO: actionに変更
//     // プロパティでコンポーネントに渡さなくていい
//     this.props.onSearchTweet();
//   },

//   render: function() {
//     var states = this.props.states;
//     return (
//       <div id="mapSection" className="map-section">
//         <MapCanvas
//           lat={states.lat}
//           lng={states.lng}
//           zoom={states.zoom}
//           within={states.within}
//           onSearchTweet={this._handleSearchTweet}
//         />
//         <div id="positionInfo">
//           <p className="latlng">Lat：<span id="lat"></span>&nbsp;&nbsp;&nbsp;Lng：<span id="lng"></span></p>
//           <p className="address"><span id="address">Address 取得中…</span></p>
//         </div>
//         <div className="link">develop by <a href="//github.com/tkabeee" target="_blank">tkabee</a>. ＠<a href="//twitter.com/TweetAroundHere" target="_blank">TweetAroundHere</a></div>
//       </div>
//     );
//   }
// });

// export default MapSection;