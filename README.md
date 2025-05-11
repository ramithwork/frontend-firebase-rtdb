# Firebase Realtime Database Module for Static Websites

This JavaScript module provides a set of convenient functions for interacting with the Firebase Realtime Database in your static frontend applications (without using Node.js or npm). It encapsulates common database operations, making your code cleaner and more organized.

## Installation

1.  **Include the Firebase SDK in your HTML:**

    Add the following `<script>` tags to the `<head>` or `<body>` of your HTML file. Make sure to include at least the "app" and "database" modules. You can find the latest CDN links on the [Firebase documentation](https://firebase.google.com/docs/web/setup#add-sdk-and-initialize).

    ```html
    <script src="[https://www.gstatic.com/firebasejs/10.x.x/firebase-app-compat.js](https://www.gstatic.com/firebasejs/10.x.x/firebase-app-compat.js)"></script>

    <script src="[https://www.gstatic.com/firebasejs/10.x.x/firebase-database-compat.js](https://www.gstatic.com/firebasejs/10.x.x/firebase-database-compat.js)"></script>

    <script src="./firebaseDatabaseModule.js"></script>
    ```

    **(Replace `10.x.x` with the latest version number.)**

2.  **Create `firebaseDatabaseModule.js`:**

    Create a JavaScript file named `firebaseDatabaseModule.js` in your project (e.g., in a `js` folder) and paste the code from the provided `firebaseDatabaseModule.js` content into it.

3.  **Configure Firebase:**

    **Important:** Open the `firebaseDatabaseModule.js` file and replace the placeholder values in the `firebaseConfig` object with your actual Firebase project credentials. You can find these in your Firebase project settings.

    ```javascript
    const firebaseApp = firebase.initializeApp({
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      databaseURL: "YOUR_DATABASE_URL",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    });
    ```

## Usage

1.  **Ensure Firebase is initialized:**

    Make sure you have included the Firebase SDK CDN links in your HTML *before* you include the `firebaseDatabaseModule.js` script.

2.  **Access the `firebaseDB` object:**

    The `firebaseDatabaseModule.js` makes the `firebaseDB` object globally accessible through the `window` object. You can now use its functions in your other JavaScript files:

    ```javascript
    // In your main script.js or within <script> tags in your HTML

    // Add new data
    firebaseDB.pushData('items', { name: 'New Item', price: 10 })
      .then(newKey => {
        console.log('Data pushed with key:', newKey);
      })
      .catch(error => {
        console.error('Failed to push data:', error);
      });

    // Get data once
    firebaseDB.getDataOnce('users/someUserId')
      .then(userData => {
        if (userData) {
          console.log('User data:', userData);
        } else {
          console.log('User not found.');
        }
      })
      .catch(error => {
        console.error('Failed to get data:', error);
      });

    // Update data
    firebaseDB.updateData('items/someItemId', { price: 12 })
      .then(() => {
        console.log('Data updated successfully.');
      })
      .catch(error => {
        console.error('Failed to update data:', error);
      });

    // Delete data
    firebaseDB.deleteData('items/anotherItemId')
      .then(() => {
        console.log('Data deleted successfully.');
      })
      .catch(error => {
        console.error('Failed to delete data:', error);
      });

    // Listen to data changes
    const unsubscribeMessages = firebaseDB.listenToData(
      'messages',
      (snapshot) => {
        console.log('New message:', snapshot.val());
      },
      (error) => {
        console.error('Error listening to messages:', error);
      }
    );

    // To stop listening later:
    // unsubscribeMessages();
    ```

## Benefits

* **Simplified Firebase Integration:** Provides a clean and organized way to interact with Firebase Realtime Database in static websites.
* **Reusability:** The `firebaseDB` object can be used across multiple script files in your project.
* **Abstraction:** Hides the direct Firebase SDK calls, making your application logic easier to read and maintain.

Remember to replace the placeholder Firebase configuration in `firebaseDatabaseModule.js` with your actual credentials!






# ============================

# 1. Setting up Ini
- Create the proj in Firebase.
- Create Realtime DB (name, nearest loc, test-mode).
- Set rules to:
    {
        "rules": {
            ".read": true,
            ".write": true
        }
    }
- Copy the DB Ref URL. This URL will take you to the actual DB:
    (https://fb-js-crud-module-test-default-rtdb.asia-southeast1.firebasedatabase.app/)
- Get config settings from Project Settings. Might have to register app.
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";

    import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";
- Create appSettings object with DB URL:
    const appSettings = {
        databaseURL: "https://fb-js-crud-module-test-default-rtdb.asia-southeast1.firebasedatabase.app/"
    };
- Create app object to initialize app:
    const app = initializeApp(appSettings);
- Create database object:
    const database = getDatabase(app);
- Create a reference:
    const shoppingListInDB = ref(database, "shoppingList");
- push data to DB:
    push(shoppingListInDB, "test item ");
- onValue to get data from DB:
    // Use Object.values or Object.keys or Object.entries. 'entries' is better because it gives key/value pairs. Make sure to check if the snapshot.exist.
    Structure:
        onValue(dbRef, function(snapshot){
            const data = Object.entries(snapshot.val()); 
        })
    Example:
        onValue(shoppingListInDB, (snapshot) => {
            const data = Object.entries(snapshot.val()); // Convert object to array of key-value pairs
            console.log(data);
        });
- Get ID of an item in the DB:
    const sampleId = '-OPuFywjLJOZqhhW09XH';
    // Get a specific item from the DB
    get(child(shoppingListInDB, sampleId)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    });
- Remove an item from the DB:
    let locationRef = ref(database, "shoppingList/" + sampleId);
    remove(locationRef);

