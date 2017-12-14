"use strict"

var React = require("react")
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

var AppActions = require("../actions/AppActions");

var MapCanvas = createReactClass({

  PropTypes: {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
    within: PropTypes.number.isRequired,
  },

  componentDidMount: function() {
    this._initMap();
  },

  componentDidUpdate: function() {
    this._createCircle();
  },

  _initMap: function() {
    var self = this;
    this.gm = {};
    this.gm.map = new google.maps.Map(document.getElementById("mapCanvas"), {
      zoom:              this.props.zoom,
      center:            new google.maps.LatLng(this.props.lat, this.props.lng),
      mapTypeControl:    false,
      mapTypeId:         google.maps.MapTypeId.ROADMAP,
      panControl:        false,
      scaleControl:      false,
      zoomControl:       true,
      streetViewControl: false
    });

    this.gm.marker = new google.maps.Marker({
      map: this.gm.map,
      position: new google.maps.LatLng(this.props.lat, this.props.lng),
      draggable: true
    });

    this.gm.geocoder = new google.maps.Geocoder();
    this.gm.infoWindow = new google.maps.InfoWindow();

    this._updateMarkerPosition(this.props.lat, this.props.lng);
    this._setGeocodePosition();
    this._setDragEvent();
    this._createCircle();

    this._handleMapClick();
    this._handleMapZoomChanged();
  },

  _setMarker: function() {
    this._deleteMarker();
    this.gm.marker = new google.maps.Marker({
      map: this.gm.map,
      position: new google.maps.LatLng(this.props.lat, this.props.lng),
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
    this._handleMarkerDragStart();
    this._handleMarkerDrag();
    this._handleMarkerDragEnd();
  },

  // マーカーのポジション更新
  _updateMarkerPosition: function(lat, lng) {
    document.getElementById("lat").textContent = lat;
    document.getElementById("lng").textContent = lng;
  },

  // 経度・緯度の更新
  _updateStateLatLng: function(lat, lng) {
    AppActions.updateLatLng(lat, lng);
  },

  // マーカーの住所を更新
  _updateMarkerAddress: function(str) {
    document.getElementById("address").textContent = str;
  },

  // ズームレベルを更新
  _updateStateZoomLevel: function() {
    var zoom = this.gm.map.getZoom();
    AppActions.updateZoom(zoom);
  },

  _createCircle: function() {
    if (this.gm.circle) {
      this._deleteCircle();
    }
    this.gm.circle = new google.maps.Circle({
      center:        new google.maps.LatLng(this.props.lat, this.props.lng),
      fillColor:     '#ff4500',
      fillOpacity:   0.2,
      radius:        this.props.within*1000,
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

  _handleMapClick: function() {
    var self = this;
    google.maps.event.addListener(self.gm.map, 'click', function(e) {
      var lat = e.latLng.lat();
      var lng = e.latLng.lng();

      self._updateStateLatLng(lat, lng);
      self._updateMarkerPosition(lat.toFixed(6), lng.toFixed(6));
      self._setMarker();
      self._setGeocodePosition();
      self._setDragEvent();
      self._createCircle();

      self.props.onSearchTweet();
    });
  },

  _handleMapZoomChanged: function() {
    var self = this;
    google.maps.event.addListener(self.gm.map, 'zoom_changed', function() {
      self._updateStateZoomLevel();
    });
  },

  _handleMarkerDragStart: function() {
    var self = this;
    google.maps.event.addListener(self.gm.marker, 'dragstart', function() {
      self._updateMarkerAddress("Address 取得中…");
    });
  },

  _handleMarkerDrag: function() {
    var self = this;
    google.maps.event.addListener(self.gm.marker, 'drag', function() {
      self._updateMarkerPosition("…","…");
    });
  },

  _handleMarkerDragEnd: function() {
    var self = this;
    google.maps.event.addListener(self.gm.marker, 'dragend', function(e) {
      var lat = e.latLng.lat();
      var lng = e.latLng.lng();
      self._updateStateLatLng(lat, lng);
      self._updateMarkerPosition(lat.toFixed(6), lng.toFixed(6));
      self._setGeocodePosition();

      self.props.onSearchTweet();
    });
  },

  render: function() {
    return (
      <div id="mapCanvas"></div>
    );
  }
});

module.exports = MapCanvas;