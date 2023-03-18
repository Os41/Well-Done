import React, { Component } from 'react';

class JeddahMap extends Component {
  componentDidMount() {
    const p1 = this.props.p1;
    const p2 = this.props.p2;

    // create a map centered on Jeddah
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {lat: 21.4858, lng: 39.1925}
    });

    // define the marker locations
    const locations = [
      {lat: p1[0], lng: p1[1], name: 'Location 1'},
      {lat: p2[0], lng: p2[1], name: 'Location 2'}
    ];

    // create markers for each location
    locations.forEach(function(location) {
      const marker = new window.google.maps.Marker({
        position: {lat: location.lat, lng: location.lng},
        map: map,
        title: location.name
      });
    });
  }

  render() {
    return (
      <div id="map" style={{height: '500px', width: '100%'}}></div>
    );
  }
}

export default JeddahMap;
