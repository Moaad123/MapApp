import * as firebase from "firebase";

  const firebaseConfig = {
    apiKey: "AIzaSyAmsEt5hSmGGceEyQ83k4_PxcJ6MSX3xnY",
    authDomain: "mapapp-4ea51.firebaseapp.com",
    projectId: "mapapp-4ea51",
    storageBucket: "mapapp-4ea51.appspot.com",
    messagingSenderId: "376352399235",
    appId: "1:376352399235:web:350199a8bac3a2df0060b6",
    measurementId: "G-HELF82RGMF"
  };
  if(firebase.apps.length == 0)
  {
      firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();
  export default db;
  

  