// test-chat-1.js

// Initial Settings
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";
const appSettings = {
  databaseURL: "https://fb-js-crud-module-test-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const testChatOneInDB = ref(database, "testChatOne");

let data // To hold the data from onValue()

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
            const messageElm = document.createElement("div");
            messageElm.classList.add("message");
            messageElm.innerHTML = `<strong>${time}</strong>: ${message}`;
            responseElm.appendChild(messageElm);
        });
        // Scroll to the bottom of the response area
        responseElm.scrollTop = responseElm.scrollHeight;
    }
    else {
        console.log("[onValue:] No data available.");
    }
});

const submitElm = document.getElementById("submit");
submitElm.addEventListener("click", (e) => {
    e.preventDefault();
    const inputElm = document.getElementById("user-input");
    const inputValue = inputElm.value;
    const timeStamp = new Date().toLocaleString();
    const message = {
        message: inputValue,
        time: timeStamp
    };
    if (message.message !== "") {
        // push data to Firebase
        push(testChatOneInDB, message);
        inputElm.value = "";
    }
});
