// Paste the code from Firebase
var firebaseConfig = {
    apiKey: "AIzaSyColJliOOc9d5bKPTteQqFpr5kGp0OH1-A",
    authDomain: "web-falapaz-rebrand.firebaseapp.com",
    databaseURL: "https://web-falapaz-rebrand.firebaseio.com",
    projectId: "web-falapaz-rebrand",
    storageBucket: "web-falapaz-rebrand.appspot.com",
    messagingSenderId: "1043282770704",
    appId: "1:1043282770704:web:4a4e537cde7d5663e38395",
    measurementId: "G-4EBP2B0ZSG"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Reference messages collection
var messagesRef = firebase.database().ref('contactFormsFciaLaPaz');

$('#contactForm').submit(function(e) {
    e.preventDefault();
 
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: $('.fullname').val(),
        email: $('.email').val(),
        subject: $('.subject').val(),
        message: $('.message').val()
    });
 
    $('.success-message').show();
 
    $('#contactForm')[0].reset();
});