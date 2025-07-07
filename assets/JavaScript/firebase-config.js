const firebaseConfig = {
  apiKey: "AIzaSyDQiJITBwBArupeVtfdEg0kXi6_X0IgnYE",
  authDomain: "join-firebase.firebaseapp.com",
  projectId: "join-firebase",
  storageBucket: "join-firebase.appspot.com",
  messagingSenderId: "731451047935",
  appId: "1:731451047935:web:5eb7431625c867654871ca",
  databaseURL: "https://join-firebase-default-rtdb.europe-west1.firebasedatabase.app"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
