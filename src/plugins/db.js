import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
  databaseURL: process.env.VUE_APP_FIREBASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECTID
})

const getNewId = ref => new Promise((resolve, reject) =>
  db.collection('ids').doc(ref)
    .get()
    .then(res => resolve(res.data().lastId + 1))
    .catch(reject))

const updateId = (ref, newId) => new Promise((resolve, reject) =>
  db.collection('ids').doc(ref)
    .set({ lastId: newId })
    .then(resolve)
    .catch(reject))

export const db = firebase.firestore()

export const getAllDocs = ref => new Promise((resolve, reject) =>
  db.collection(ref)
    .get()
    .then(query => {
      const response = []
      query.forEach(doc => {
        response.push({ id: +doc.id, ...doc.data() })
      })
      return resolve(response)
    })
    .catch(err => reject(err)))

export const newDoc = (ref, data) => new Promise(async (resolve, reject) => {
  const newId = await getNewId(ref)
  return db.collection(ref).doc(String(newId))
    .set(data)
    .then(res => {
      updateId(ref, newId)
      resolve(res)
    })
    .catch(err => reject(err))
})
