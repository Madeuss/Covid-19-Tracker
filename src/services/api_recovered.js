import axios from 'axios'

const api_recovered = axios.create({
    baseURL: 'https://covid19.mathdro.id/api'
})

export default api_recovered