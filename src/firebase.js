import firebase from 'firebase';

const prodConfig = {
    apiKey: "AIzaSyBERjG4NaMUKSEJxP-W2JTJYXP8fKGnPyo",
    authDomain: "covidtrackermadeus.firebaseapp.com",
    databaseURL: "https://covidtrackermadeus.firebaseio.com",
    projectId: "covidtrackermadeus",
    storageBucket: "covidtrackermadeus.appspot.com",
    messagingSenderId: "437386045269",
    appId: "1:437386045269:web:7a40855f3fd661d811b1dc",
    measurementId: "G-FPJ38SHXH8"
  };

  const devConfig = {
    apiKey: "AIzaSyBERjG4NaMUKSEJxP-W2JTJYXP8fKGnPyo",
    authDomain: "covidtrackermadeus.firebaseapp.com",
    databaseURL: "https://covidtrackermadeus.firebaseio.com",
    projectId: "covidtrackermadeus",
    storageBucket: "covidtrackermadeus.appspot.com",
    messagingSenderId: "437386045269",
    appId: "1:437386045269:web:7a40855f3fd661d811b1dc",
    measurementId: "G-FPJ38SHXH8"
  };

  const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

  
export const fnirebaseImpl = firebase.initializeApp(config);