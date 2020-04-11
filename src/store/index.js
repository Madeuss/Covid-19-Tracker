import React, { useState, useEffect } from 'react';
import { createStore } from 'redux';

import api from '../services/api'

    const INITIAL_STATE = {}

fetch("https://coronavirus-tracker-api.herokuapp.com/v2/locations")
	.then(response => response.json())
	.then(data => {
        const INITIAL_STATE= data.locations

    })

function dataCountry(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOAD_DATA':
            return { ...state, data: [...state.data, action.payload] }
        default:
            return state
    }
} 

const store = createStore(dataCountry)

export default store