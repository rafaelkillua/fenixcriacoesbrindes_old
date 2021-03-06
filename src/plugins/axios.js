'use strict'

import axios from 'axios'

let config = {
  baseURL: process.env.VUE_APP_baseURL
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

_axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default _axios
