"use strict";

import React from "react";
import PropTypes from "prop-types";
import createReactClass from "create-react-class";

import AppActions from "../actions/AppActions";

const MapCanvas = createReactClass({

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
    this.gm.geocoder.geocode({
      latLng: this.gm.marker.getPosition()
    }, (responses) => {
      if (responses && responses.length > 0) {
        this._updateMarkerAddress(responses[0].formatted_address);
      } else {
        this._updateMarkerAddress("この場所の周辺情報を取得できませんでした。");
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
      fillColor:     "#ff4500",
      fillOpacity:   0.2,
      radius:        this.props.within*1000,
      strokeColor:   "#ff4500",
      strokeOpacity: 1,
      strokeWeight:  1
    });

    this.gm.circle.bindTo("center", this.gm.marker, "position");
    this.gm.circle.setMap(this.gm.map);
  },

  _deleteCircle: function() {
    this.gm.circle.setMap(null);
  },

  _handleMapClick: function() {
    google.maps.event.addListener(this.gm.map, "click", (e) => {
      var lat = e.latLng.lat();
      var lng = e.latLng.lng();

      this._updateStateLatLng(lat, lng);
      this._updateMarkerPosition(lat.toFixed(6), lng.toFixed(6));
      this._setMarker();
      this._setGeocodePosition();
      this._setDragEvent();
      this._createCircle();

      this.props.onSearchTweet();
    });
  },

  _handleMapZoomChanged: function() {
    google.maps.event.addListener(this.gm.map, "zoom_changed", () => {
      this._updateStateZoomLevel();
    });
  },

  _handleMarkerDragStart: function() {
    google.maps.event.addListener(this.gm.marker, "dragstart", () => {
      this._updateMarkerAddress("Address 取得中…");
    });
  },

  _handleMarkerDrag: function() {
    google.maps.event.addListener(this.gm.marker, "drag", () => {
      this._updateMarkerPosition("…","…");
    });
  },

  _handleMarkerDragEnd: function() {
    google.maps.event.addListener(this.gm.marker, "dragend", (e) => {
      var lat = e.latLng.lat();
      var lng = e.latLng.lng();
      this._updateStateLatLng(lat, lng);
      this._updateMarkerPosition(lat.toFixed(6), lng.toFixed(6));
      this._setGeocodePosition();

      this.props.onSearchTweet();
    });
  },

  render: function() {
    return (
      <div id="mapCanvas"></div>
    );
  }
});

export default MapCanvas;