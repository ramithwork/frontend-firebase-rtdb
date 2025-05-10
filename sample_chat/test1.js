// Firebase Realtime Database CRUD operations

// Initial Settings
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";
const appSettings = {
  databaseURL: "https://fb-js-crud-module-test-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

let data // To hold the data from onValue()

// push Data to Firebase (commented when want to stop pushing data)
// push(shoppingListInDB, "test item " + Math.random());

// Read Data from Firebase. Fires every time data changes in the database.
onValue(shoppingListInDB, (snapshot) => {
    if (snapshot.exists()) {
        //const data = Object.values(snapshot.val()); // Convert object to array with values only
        //const data = Object.keys(snapshot.val()); // Convert object to array with keys only
        data = Object.entries(snapshot.val()); // Convert object to array of key-value pairs
        console.log("[onValue:]", data);
    }
    else {
        console.log("[onValue:] No data available.");
    }
});

// Get ID of an item in the DB
const sampleId = "-OPuGMWCVTIUgBIhlih2";
// Get a specific item from the DB
get(child(shoppingListInDB, sampleId)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
    } else {
        console.log("[get:] No data available.");
    }
});

// Update an item in the DB
const updateKey = "-OPuGMWCVTIUgBIhlih2";
const updateValue = "updated item " + Math.random();
function updateEntry(key, value) {
    const updates = {};
    updates["/" + key] = value;
    update(shoppingListInDB, updates);
}
updateEntry(updateKey, updateValue);

// Remove an item from the DB. Somestimes commented out to prevent deletion.
let removeId = "-OPuGMWCVTIUgBIhlih2";
let locationRef = ref(database, "shoppingList/" + removeId);
remove(locationRef);

