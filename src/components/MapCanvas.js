"use strict";

import React from "react";
import AppActions from "../actions/AppActions";

export default class MapCanvas extends React.Component {
  constructor(props) {
    super(props);

    this.gm = {};
  }

  componentDidMount() {
    this.initMap();
  }

  componentDidUpdate() {
    this.createCircle();
  }

  initMap() {
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

    this.updateMarkerPosition(this.props.lat, this.props.lng);
    this.setGeocodePosition();
    this.setDragEvent();
    this.createCircle();

    this.handleMapClick();
    this.handleMapZoomChanged();
  }

  setMarker() {
    this.deleteMarker();
    this.gm.marker = new google.maps.Marker({
      map: this.gm.map,
      position: new google.maps.LatLng(this.props.lat, this.props.lng),
      draggable: true
    });
  }

  deleteMarker() {
    this.gm.marker.setMap(null);
  }

  setGeocodePosition() {
    this.gm.geocoder.geocode({
      latLng: this.gm.marker.getPosition()
    }, (responses) => {
      if (responses && responses.length > 0) {
        this.updateMarkerAddress(responses[0].formatted_address);
      } else {
        this.updateMarkerAddress("この場所の周辺情報を取得できませんでした。");
      }
    });
  }

  setDragEvent() {
    this.handleMarkerDragStart();
    this.handleMarkerDrag();
    this.handleMarkerDragEnd();
  }

  // マーカーのポジション更新
  updateMarkerPosition(lat, lng) {
    document.getElementById("lat").textContent = lat;
    document.getElementById("lng").textContent = lng;
  }

  // 経度・緯度の更新
  updateStateLatLng(lat, lng) {
    AppActions.updateLatLng(lat, lng);
  }

  // マーカーの住所を更新
  updateMarkerAddress(str) {
    document.getElementById("address").textContent = str;
  }

  // ズームレベルを更新
  updateStateZoomLevel() {
    var zoom = this.gm.map.getZoom();
    AppActions.updateZoom(zoom);
  }

  createCircle() {
    if (this.gm.circle) {
      this.deleteCircle();
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
  }

  deleteCircle() {
    this.gm.circle.setMap(null);
  }

  handleMapClick() {
    google.maps.event.addListener(this.gm.map, "click", (e) => {
      var lat = e.latLng.lat();
      var lng = e.latLng.lng();

      this.updateStateLatLng(lat, lng);
      this.setMarker();
      this.setGeocodePosition();
      this.setDragEvent();
      this.createCircle();

      this.props.onSearchTweet();
    });
  }

  handleMapZoomChanged() {
    google.maps.event.addListener(this.gm.map, "zoom_changed", () => {
      this.updateStateZoomLevel();
    });
  }

  handleMarkerDragStart() {
    google.maps.event.addListener(this.gm.marker, "dragstart", () => {
      this.updateMarkerAddress("Address 取得中…");
    });
  }

  handleMarkerDrag() {
    google.maps.event.addListener(this.gm.marker, "drag", () => {
      this.updateMarkerPosition("…","…");
    });
  }

  handleMarkerDragEnd() {
    google.maps.event.addListener(this.gm.marker, "dragend", (e) => {
      var lat = e.latLng.lat();
      var lng = e.latLng.lng();
      this.updateStateLatLng(lat, lng);
      this.setGeocodePosition();

      this.props.onSearchTweet();
    });
  }

  render() {
    return (
      <div id="mapCanvas"></div>
    );
  }
}

MapCanvas.propTypes = {
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  zoom: React.PropTypes.number,
  within: React.PropTypes.number,
  onSearchTweet: React.PropTypes.func,
};