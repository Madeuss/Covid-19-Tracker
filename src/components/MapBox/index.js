import React from 'react';

import './styles.css'

export default function MapBox() {

  var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
 
  mapboxgl.accessToken = 'pk.eyJ1IjoibWF0ZXVzMXR3bzMiLCJhIjoiY2s4dGhiNWo1MDBhazNmbjI5ejV4Y2FnMiJ9.YpD2TO43vR0764qPQf72qg';
  
  var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  zoom: 1.1,
  center: [10, 25],
  });

  return (
    <div />
  );
}
