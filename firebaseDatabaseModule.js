 // firebaseDatabaseModule.js

const firebaseApp = firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
});

const db = firebase.database(firebaseApp);

const firebaseDB = {
  /**
   * Adds new data to a specific path in the database.
   * Generates a unique key for the new data.
   * @param {string} path - The database path where the data will be added (e.g., 'users').
   * @param {object} data - The data to be added.
   * @returns {Promise<string>} - A Promise that resolves with the unique key of the newly added data.
   */
  pushData: (path, data) => {
    const reference = firebase.database().ref(path);
    const newRef = reference.push(data);
    return new Promise((resolve, reject) => {
      newRef.then(() => {
        resolve(newRef.key);
      }).catch(error => {
        console.error("Error pushing data:", error);
        reject(error);
      });
    });
  },

  /**
   * Retrieves data from a specific path in the database once.
   * @param {string} path - The database path to retrieve data from (e.g., 'users/userId').
   * @returns {Promise<object|null>} - A Promise that resolves with the data snapshot value, or null if no data exists.
   */
  getDataOnce: (path) => {
    const reference = firebase.database().ref(path);
    return reference.get().then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    }).catch(error => {
      console.error("Error getting data:", error);
      throw error;
    });
  },

  /**
   * Updates data at a specific path in the database.
   * Can update multiple properties at once.
   * @param {string} path - The database path to update (e.g., 'users/userId').
   * @param {object} updateData - An object containing the key-value pairs to update.
   * @returns {Promise<void>} - A Promise that resolves when the update is successful.
   */
  updateData: (path, updateData) => {
    const reference = firebase.database().ref(path);
    return reference.update(updateData).catch(error => {
      console.error("Error updating data:", error);
      throw error;
    });
  },

  /**
   * Deletes data at a specific path in the database.
   * @param {string} path - The database path to delete (e.g., 'users/userId').
   * @returns {Promise<void>} - A Promise that resolves when the deletion is successful.
   */
  deleteData: (path) => {
    const reference = firebase.database().ref(path);
    return reference.remove().catch(error => {
      console.error("Error deleting data:", error);
      throw error;
    });
  },

  /**
   * Sets up a listener for changes at a specific path in the database.
   * The callback function will be invoked whenever the data at the path changes.
   * @param {string} path - The database path to listen to (e.g., 'messages').
   * @param {function} callback - A function that will be called with the data snapshot.
   * The snapshot object has a `val()` method to get the data.
   * @param {function} [errorCallback] - An optional function that will be called if an error occurs.
   * @returns {function} - A function that can be called to unsubscribe the listener.
   */
  listenToData: (path, callback, errorCallback) => {
    const reference = firebase.database().ref(path);
    const listener = reference.on('value', (snapshot) => {
      callback(snapshot);
    }, (error) => {
      if (errorCallback) {
        errorCallback(error);
      } else {
        console.error("Error listening to data:", error);
      }
    });
    return () => {
      reference.off('value', listener);
    };
  }
};

// Make firebaseDB globally accessible (optional, but convenient for static sites)
window.firebaseDB = firebaseDB;
