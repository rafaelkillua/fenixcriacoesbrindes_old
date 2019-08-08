import Vue from 'vue'
import firebase from 'firebase'
import { rtdbPlugin } from 'vuefire'

Vue.use(rtdbPlugin)

export const db = firebase
  .initializeApp({ databaseURL: process.env.VUE_APP_FIREBASE_URL })
  .database()
