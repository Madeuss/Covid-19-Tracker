import axios from 'axios'

const api = axios.create({
    baseURL: 'https://coronavirus-tracker-api.herokuapp.com/v2/locations'
})

export default api