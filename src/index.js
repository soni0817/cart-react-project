import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCNJNy3SVZC-PGGZ_6sy8LaJY5W3a6YLMo",
    authDomain: "cart-41baa.firebaseapp.com",
    projectId: "cart-41baa",
    storageBucket: "cart-41baa.appspot.com",
    messagingSenderId: "559695956999",
    appId: "1:559695956999:web:95f32ce57fcbe99e6caea2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

