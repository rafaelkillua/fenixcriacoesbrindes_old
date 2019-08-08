import Vue from 'vue'
import { rtdbPlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/database'

Vue.use(rtdbPlugin)

firebase.initializeApp({ databaseURL: process.env.VUE_APP_FIREBASE_URL })

export const db = firebase.database()
