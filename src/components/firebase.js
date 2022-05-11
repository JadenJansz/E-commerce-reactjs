import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC91PZ4JzQLwSZkY20nTso2OUmtlnnl1ZI",
  authDomain: "e-commerce-70a37.firebaseapp.com",
  projectId: "e-commerce-70a37",
  storageBucket: "e-commerce-70a37.appspot.com",
  messagingSenderId: "1062450539041",
  appId: "1:1062450539041:web:13c809674aa664e4a0d160",
  measurementId: "G-XQQHGDM48T"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider }; 