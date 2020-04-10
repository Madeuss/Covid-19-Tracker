import { createStore } from 'redux';

const INITIAL_STATE = {
    data: {
        latest: {
            confirmed: 0,
            deaths: 0,
            recovered: 0
        }
    }
}

function dataCountry(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOAD_DATA':
            return { state, data: [...state.data, action.title] }
        default:
            return state
    }
} 

const store = createStore(dataCountry)

export default store