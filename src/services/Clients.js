import { getAllDocs, newDoc } from '@/plugins/db'

const ref = 'clients'

export default {
  getClients () {
    return getAllDocs(ref)
  },
  newClient (data) {
    return newDoc(ref, data)
  }
}
