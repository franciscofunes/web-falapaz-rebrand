'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

//to make it work you need gmail account
const gmailEmail = functions.config().gmail.login;
const gmailPassword = functions.config().gmail.pass;

admin.initializeApp();

//creating function for sending emails
var goMail = function (formEmail,formName,formTelephone,formMessage) {

//transporter is a way to send your emails
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmailEmail,
            pass: gmailPassword
        }
    });

    // setup email data with unicode symbols
    //this is how your email are going to look like
    const mailOptions = {
        from: gmailEmail, // sender address
        to: 'falapaz@yahoo.com.ar', // list of receivers
        subject: 'Formulario Contacto Web Farmacia La Paz', // Subject line
        text: 'Email:' + formEmail, // plain text body
        text2: 'Nombre:' + formName,
        number1: 'Telefono:' + formTelephone,
        text3: 'Mensaje:' + formMessage,
        html: `CUERPO MENSAJE↠ •Email:${formEmail} •Nombre:${formName} •Telefono:${formTelephone} •Mensaje: ${formMessage}` // html body
     
    };

    //this is callback function to return status to firebase console
    const getDeliveryStatus = function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    };

    //call of this function send an email, and return status
    transporter.sendMail(mailOptions, getDeliveryStatus);
};

//.onDataAdded is watches for changes in database
exports.onDataAdded = 
functions.database.ref('/contactFormsFciaLaPaz/{sessionId}').onCreate(function (snap, context) {

    //here we catch a new data, added to firebase database, it stored in a snap variable
    const createdData = snap.val();
    let email = createdData.email;
    let name = createdData.name;
    let phone = createdData.subject;
    let message = createdData.message;


    //here we send new data using function for sending emails
    goMail(email,name,phone,message);
});

