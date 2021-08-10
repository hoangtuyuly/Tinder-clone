import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyCaxjQoemdPVrJcdFzxBYupSL2CZJmAwXg",
  authDomain: "tinder-clone-cb859.firebaseapp.com",
  projectId: "tinder-clone-cb859",
  storageBucket: "tinder-clone-cb859.appspot.com",
  messagingSenderId: "724123106011",
  appId: "1:724123106011:web:c6aa4c3a802e187af2eafe",
  measurementId: "G-FC6RCGRGRX"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { database, auth, storage };