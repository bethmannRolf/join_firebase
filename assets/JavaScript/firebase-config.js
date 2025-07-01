const firebaseConfig = {
  apiKey: "AIzaSyDQiJITBwBArupeVtfdEg0kXi6_X0IgnYE",
  authDomain: "join-firebase.firebaseapp.com",
  projectId: "join-firebase",
  storageBucket: "join-firebase.appspot.com",
  messagingSenderId: "731451047935",
  appId: "1:731451047935:web:5eb7431625c867654871ca",

  // 💡 Das brauchst du für Realtime Database
  databaseURL: "https://join-firebase-default-rtdb.europe-west1.firebasedatabase.app"
};

// Firebase initialisieren
firebase.initializeApp(firebaseConfig);

// Jetzt kannst du korrekt auf die Realtime Database zugreifen
const database = firebase.database();
