import firebase from 'firebase/app';

const firebaseConfig = {
  // Your web app's Firebase configuration
    apiKey: "AIzaSyC2y6EhC5NMqIjzCDNZfbBimVpZle_CygA",
    authDomain: "tenedores-e16e9.firebaseapp.com",
    projectId: "tenedores-e16e9",
    storageBucket: "tenedores-e16e9.appspot.com",
    messagingSenderId: "16664749456",
    appId: "1:16664749456:web:016aabdfcd11d5f9257f15"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);