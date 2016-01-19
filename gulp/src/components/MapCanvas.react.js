"use strict";

var React = require("react");

var MapCanvas = React.createClass({

  PropTypes: {
    lat: React.PropTypes.number.isRequired,
    lng: React.PropTypes.number.isRequired,
    zoom: React.PropTypes.number.isRequired,
    within: React.PropTypes.number.isRequired,
  },

  getInitialState: function() {
    return {
      lat: this.props.lat,
      lng: this.props.lng,
      zoom: this.props.zoom,
      within: this.props.within,
    };
  },

  componentDidMount: function() {
    this._initMap();
  },

  _initMap: function() {
    var self = this;
    this.gm = {};
    this.gm.map = new google.maps.Map(document.getElementById("mapCanvas"), {
      zoom:              this.state.zoom,
      center:            new google.maps.LatLng(this.state.lat, this.state.lng),
      mapTypeControl:    false,
      mapTypeId:         google.maps.MapTypeId.ROADMAP,
      panControl:        false,
      scaleControl:      false,
      zoomControl:       true,
      streetViewControl: false
    });

    this.gm.marker = new google.maps.Marker({
      map: this.gm.map,
      position: new google.maps.LatLng(this.state.lat, this.state.lng),
      draggable: true
    });

    this.gm.geocoder = new google.maps.Geocoder();
    this.gm.infoWindow = new google.maps.InfoWindow();

    this._updateMarkerPosition(this.state.lat, this.state.lng);
    this._setGeocodePosition();
    this._setDragEvent();
    this._createCircle();

    google.maps.event.addListener(self.gm.map, 'click', function(e) {
      self.state.lat = e.latLng.lat();
      self.state.lng = e.latLng.lng();

      self._setMarker();
      self._updateMarkerPosition(self.state.lat, self.state.lng);
      self._setGeocodePosition();
      self._setDragEvent();
      self._createCircle();
      // TODO: 初期検索を実行
      console.log('TODO:');
    });

    google.maps.event.addListener(self.gm.map, 'zoom_changed', function() {
      self._updateZoomLevel();
    });
  },

  _setMarker: function() {
    this._deleteMarker();
    this.gm.marker = new google.maps.Marker({
      map: this.gm.map,
      position: new google.maps.LatLng(this.state.lat, this.state.lng),
      draggable: true
    });
  },

  _deleteMarker: function() {
    this.gm.marker.setMap(null);
  },

  _setGeocodePosition: function() {
    var self = this;
    self.gm.geocoder.geocode({
      latLng: self.gm.marker.getPosition()
    }, function(responses) {
      if (responses && responses.length > 0) {
        self._updateMarkerAddress(responses[0].formatted_address);
      } else {
        self._updateMarkerAddress('この場所の周辺情報を取得できませんでした。');
      }
    });
  },

  _setDragEvent: function() {
    var self = this;
    google.maps.event.addListener(self.gm.marker, 'dragstart', function() {
      self._updateMarkerAddress("Address 取得中…");
    });
    google.maps.event.addListener(self.gm.marker, 'drag', function() {
      self._updateMarkerPosition("…","…");
      self._updateZoomLevel();
    });
    google.maps.event.addListener(self.gm.marker, 'dragend', function() {
      self._updateMarkerPosition(self.state.lat, self.state.lng);
      self._setGeocodePosition();
      // TODO: マーカードラッグ後にtweet検索
      console.log('TODO:');
      // this.twsearch(Tws.query, Tws.lat, Tws.lng, Tws.within, Tws.units, Tws.rpp);
    });
  },

  // マーカーのポジション更新
  _updateMarkerPosition: function(lat, lng) {
    document.getElementById("lat").textContent = lat;
    document.getElementById("lng").textContent = lng;
  },

  // マーカーの住所を更新
  _updateMarkerAddress: function(str) {
    document.getElementById("address").textContent = str;
  },

  // ズームレベルを更新
  _updateZoomLevel: function() {
    this.setState({
      zoom: this.gm.map.getZoom()
    });
  },

  _createCircle: function() {
    if (this.gm.circle) {
      this._deleteCircle();
    }
    this.gm.circle = new google.maps.Circle({
      center:        new google.maps.LatLng(this.state.lat, this.state.lng),
      fillColor:     '#ff4500',
      fillOpacity:   0.2,
      radius:        this.state.within*1000,
      strokeColor:   '#ff4500',
      strokeOpacity: 1,
      strokeWeight:  1
    });

    this.gm.circle.bindTo('center', this.gm.marker, 'position');
    this.gm.circle.setMap(this.gm.map);
  },

  _deleteCircle: function() {
    this.gm.circle.setMap(null);
  },

  render: function() {
    return (
      <div id="mapCanvas"></div>
    );
  }
});

module.exports = MapCanvas;