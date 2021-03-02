import firebase from "firebase/app";


const firebaseConfig ={
    apiKey: "AIzaSyD8EXIzgw_3VknGMlyTDKHhyQi--v6mhGI",
    authDomain: "apptask-525c3.firebaseapp.com",
    projectId: "apptask-525c3",
    storageBucket: "apptask-525c3.appspot.com",
    messagingSenderId: "614029795763",
    appId: "1:614029795763:web:a03ed69ec80b0ec1b3abc6",
    measurementId: "G-SBD8HH48R2"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);