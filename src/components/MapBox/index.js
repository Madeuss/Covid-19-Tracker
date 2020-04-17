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

	const getColorFromConfirmedCount = count => {
		if (count >= 100000){
			return 'rgb(228, 71, 71)'
		}
		if (count >= 30000 ){
			return 'rgb(000, 010, 200)'
		}
		if (count >= 10000 ){
			return 'rgb(000, 100, 255)'
		}
		if (count >= 1000 ){
			return 'rgb(000, 180, 255)'
		}
		return 'grey'
	}

fetch("https://coronavirus-tracker-api.herokuapp.com/v2/locations")
	.then(response => response.json())
	.then(data => {

		const locations = data.locations

		locations.forEach(location => {
			const { coordinates, latest } = location

			 new mapboxgl.Marker({
				color: getColorFromConfirmedCount(latest.confirmed)
			})
			.togglePopup(true)
			.setLngLat([ coordinates.longitude, coordinates.latitude ])
			.addTo(map);
		})
	})

	return (
		<div />
	);
}
