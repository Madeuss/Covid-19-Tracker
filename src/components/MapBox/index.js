import React, { useEffect } from 'react';

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

const getColorFromConfirmedCount = count => {
	if (count >= 3000){
		return 'rgb(228, 71, 71)'
	}
	if (count >= 400 ){
		return 'rgb(000, 080, 255)'
	}
	return 'grey'
}

fetch("https://coronavirus-tracker-api.herokuapp.com/v2/locations")
	.then(response => response.json())
	.then(data => {

		const locations = data.locations

		locations.forEach(location => {
			const { coordinates, latest, id } = location
			console.log( coordinates, latest, id);

			new mapboxgl.Marker({
				color: getColorFromConfirmedCount(latest.confirmed)
			})
			.setLngLat([ coordinates.longitude, coordinates.latitude ])
			.addTo(map);
		})
	})

	var canvas = map.getCanvasContainer();
 
	var geojson = {
		'type': 'FeatureCollection',
		'features': [{
			'type': 'Feature',
			'geometry': {
				'type': 'Point',
				'coordinates': [0, 0]
			}
		}]
	};

	map.on('load', function() {
		// Add a single point to the map
		map.addSource('point', {
			'type': 'geojson',
			'data': geojson
		});
		 
		map.addLayer({
			'id': 'point',
			'type': 'circle',
			'source': 'point',
			'paint': {
				'circle-radius': 20,
				'circle-color': '#6168ff'
			}
		});
	})


	return (
		<div />
	);
}
