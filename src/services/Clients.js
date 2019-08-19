import axios from '@/plugins/axios'

export default {
  getClients (pagination) {
    return axios.get('/users')
  },
  newClient (data) {
    // return newDoc(ref, data)
  }
}
