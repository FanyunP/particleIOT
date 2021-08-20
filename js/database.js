
var firebaseConfig = {
    apiKey: "AIzaSyBYaouxgXDKooFxlOtuUkiPTe9Tdo6RF08",
    authDomain: "howthrone.firebaseapp.com",
    projectId: "howthrone",
    storageBucket: "howthrone.appspot.com",
    messagingSenderId: "669108546129",
    appId: "1:669108546129:web:36ec3d1a12746b293ca670"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var ref = database.ref('token').orderByKey();
// ref.once("value").then(function(data){
//   console.log(data.val());
// });


// ref.on('value',gotData,errData);
// var myToken;

// function gotData(data){
//   myToken = data.val();
//   devicesPr = particle.listDevices({auth: myToken });
//   console.log(myToken);
// }

// function errData(err){
//   console.log("error!");
//   console.log(err);
// } 

// {
//   "rules": {
//     ".read": "now < 1615611600000",  // 2021-3-13
//     ".write": "now < 1615611600000",  // 2021-3-13
//   }
// }