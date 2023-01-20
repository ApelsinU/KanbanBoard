import axios from 'axios'

export const BASE_API_URL = 'https://localhost:5000'

export const $host = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})
