import { getAllDocs, newDoc } from '@/plugins/db'

const ref = 'orders'

export default {
  getOrders () {
    return getAllDocs(ref)
  },
  newOrder (data) {
    return newDoc(ref, data)
  }
}
