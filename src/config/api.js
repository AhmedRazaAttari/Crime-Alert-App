import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyAwcWPE8Ds9lbAZ4-DKFx7ulPMyrIS0g_U",
    authDomain: "crimealertapp-864a4.firebaseapp.com",
    databaseURL: "https://crimealertapp-864a4.firebaseio.com",
    projectId: "crimealertapp-864a4",
    storageBucket: "",
    messagingSenderId: "844829774487",
    appId: "1:844829774487:web:9343a91df54fbd0a4d8fd2"
  };
  // Initialize Firebase
  var config = firebase.initializeApp(firebaseConfig);
  export default config;