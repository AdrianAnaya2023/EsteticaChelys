import firebase from 'firebase/app';
import 'firebase/storage';  // Importa solo lo necesario
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC9XxDZrmjv-5uwjvl6NIfNak56fEBzRw",
  authDomain: "esteticachely-83ac7.firebaseapp.com",
  projectId: "esteticachely-83ac7",
  storageBucket: "esteticachely-83ac7.appspot.com",
  messagingSenderId: "919906389992",
  appId: "1:919906389992:web:43ae62a831ad08841dde5d",
  measurementId: "G-JCDZZ7892V"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };