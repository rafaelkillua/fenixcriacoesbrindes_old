import { db } from '@/plugins/db'

const ref = 'client'

export default {
  getClients () {
    return new Promise(resolve => {
      db.ref(ref).once('value', snapshot => resolve(snapshot.val()))
    })
  },
  newClient (data) {
    return db.ref(ref)
  }
}
