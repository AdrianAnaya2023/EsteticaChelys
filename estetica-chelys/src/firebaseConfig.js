// Importa las funciones específicas de Firebase v9+
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyCC9XxDZrmjv-5uwjvl6NIfNak56fEBzRw",
  authDomain: "esteticachely-83ac7.firebaseapp.com",
  projectId: "esteticachely-83ac7",
  storageBucket: "esteticachely-83ac7.appspot.com",
  messagingSenderId: "919906389992",
  appId: "1:919906389992:web:43ae62a831ad08841dde5d",
  measurementId: "G-JCDZZ7892V"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene la instancia de Firebase Storage
const storage = getStorage(app);

export { storage };