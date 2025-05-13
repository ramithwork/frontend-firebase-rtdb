// test-chat-1-auth.js

// Initial Settings
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";
import { getAuth, signInAnonymously } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/11.1.0/firebase-auth.js"
const firebaseConfig = {
    apiKey: "AIzaSyBJY1EQdcG_JpqIkoYuw2ho5Rh2WdlFT60",
    authDomain: "fb-js-crud-module-test.firebaseapp.com",
    databaseURL: "https://fb-js-crud-module-test-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fb-js-crud-module-test",
    storageBucket: "fb-js-crud-module-test.firebasestorage.app",
    messagingSenderId: "815488085921",
    appId: "1:815488085921:web:9d8129abf53a059e43e5e0"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const testChatOneInDB = ref(database, "testChatOne");


const auth = getAuth(app);
signInAnonymously(auth)
    .then(() => {
        // Signed in..
        console.log("Signed In.");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        console.log("Error:", errorCode, errorMessage)
    }
);
