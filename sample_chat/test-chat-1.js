// test-chat-1.js

// Initial Settings
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { getDatabase, ref, push, onValue, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";
const appSettings = {
//   databaseURL: "https://fb-js-crud-module-test-default-rtdb.asia-southeast1.firebasedatabase.app/"
    apiKey: "AIzaSyBJY1EQdcG_JpqIkoYuw2ho5Rh2WdlFT60",
    authDomain: "fb-js-crud-module-test.firebaseapp.com",
    databaseURL: "https://fb-js-crud-module-test-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fb-js-crud-module-test",
    storageBucket: "fb-js-crud-module-test.firebasestorage.app",
    messagingSenderId: "815488085921",
    appId: "1:815488085921:web:9d8129abf53a059e43e5e0"
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const testChatOneInDB = ref(database, "testChatOne");

let data // To hold the data from onValue()

const youAreElm = document.getElementById("you-are");
// const user = navigator.userAgent;
let userId;
// youAreElm.innerHTML = `You are: <strong>${userId}</strong>`;

onValue(testChatOneInDB, (snapshot) => {
    if (snapshot.exists()) {
        //const data = Object.values(snapshot.val()); // Convert object to array with values only
        //const data = Object.keys(snapshot.val()); // Convert object to array with keys only
        data = Object.entries(snapshot.val()); // Convert object to array of key-value pairs
        console.log("[onValue:]", data);
        // Show messages in response area
        const responseElm = document.getElementById("response");
        responseElm.innerHTML = ""; // Clear previous messages
        data.forEach((item) => {
            const message = item[1].message;
            const time = item[1].time;
            const user = item[1].user;
            const messageElm = document.createElement("div");
            messageElm.classList.add("message");
            messageElm.innerHTML = `<span class="message"><small>${user}<br>${time}</small>:<br><strong>${message}</strong></span>`;
            responseElm.appendChild(messageElm);
        });
        // Scroll to the bottom of the response area
        responseElm.scrollTop = responseElm.scrollHeight;
        youAreElm.innerHTML = `You are: <strong>${userId}</strong>`;
    }
    else {
        console.log("[onValue:] No data available.");
    }
});

const inputElm = document.getElementById("user-input");
inputElm.focus();

// Add a new message
const submitElm = document.getElementById("submit");
submitElm.addEventListener("click", (e) => {
    e.preventDefault();
    const inputValue = inputElm.value;
    const timeStamp = new Date().toLocaleString();
    const message = {
        user: userId,
        message: inputValue,
        time: timeStamp
    };
    if (message.message !== "") {
        // push data to Firebase
        push(testChatOneInDB, message);
        inputElm.value = "";
    }
});




// Auth
const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        userId = `${user.displayName} (${user.uid})`;
        youAreElm.innerHTML = `You are: <strong>${userId}</strong>`;
        console.log("user.uid", user.uid);
        console.log("user", user);
        // ...
    } else {
        // User is signed out
        // ...
        console.log("User is signed out.");
        signInAnonymously(auth)
            .then(() => {
                // Signed in..
                console.log("Signed In.");
                const displayName = prompt("Enter display name:");
                console.log("displayName:", displayName);
                updateProfile(auth.currentUser, {
                    displayName: displayName
                    }).then(() => {
                        // Profile updated!
                        console.log("Profile updated.")
                        userId = `${displayName} (${currentUser.displayName})`;
                        youAreElm.innerHTML = `You are: <strong>${userId}</strong>`;
                    }).catch((error) => {
                        // An error occurred
                        console.log("Profile NOT updated.")
                        // ...
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
                console.log("Error:", errorCode, errorMessage)
            });
    }
});
