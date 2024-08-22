import "./commands";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { attachCustomCommands } from 'cypress-firebase';

const fbConfig = {
    apiKey: "AIzaSyCTm_47x7wyg8qPrSYKNVXPls0W0Ppi8AI",
    authDomain: "pojokoding-startup.firebaseapp.com",
    projectId: "pojokoding-startup",
    storageBucket: "pojokoding-startup.appspot.com",
    messagingSenderId: "437430484981",
    appId: "1:437430484981:web:310d6db7fc92364fa6aabc",
    measurementId: "G-ZQHR60DELH"
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
