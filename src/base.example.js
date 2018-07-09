import firebase from 'firebase/app'
import 'firebase/database'
import Rebase from 're-base'

// Initialize Firebase
const config = {
  apiKey: "YOUR API KEY",
  authDomain: "YOUR AUTH DOMAIN",
  databaseURL: "YOUR DATABASE URL",
  projectId: "YOUR PROJECT ID",
  storageBucket: "YOUR STORAGE BUCKET",
  messagingSenderId: "YOUR MESSAGING SENDER ID"
}

const app = firebase.initializeApp(config)

// Configure database and Rebase
const db = firebase.database(app)
const base = Rebase.createClass(db)
export default base
