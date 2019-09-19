import * as firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyDpyl3l_F1QxZAe0q-P_FpmzFYr8pSrROA",
    authDomain: "calendarmanagement-cb8a9.firebaseapp.com",
    databaseURL: "https://calendarmanagement-cb8a9.firebaseio.com",
    projectId: "calendarmanagement-cb8a9",
    storageBucket: "",
    messagingSenderId: "491867746993",
    appId: "1:491867746993:web:fc60858c7bd86b88142890"
  };
  // Initialize Firebase

  export const firebaseConnect =   firebase.initializeApp(firebaseConfig);

//   var data = firebase.database().ref('user_account/');
//   data.once('value').then(function(snapshot){
//       console.log(snapshot.val())
//   })

// const db = firebase.firestore();
// db.collection('user_account').get().then(function(snapshot){
//     const data = snapshot.docs.map(doc => doc.data());
//     console.log(data); // array of cities objects
// })
