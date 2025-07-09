let currentUser = null;

/**
 * Lädt den aktuellen Benutzer aus Firestore.
 * @param {string} userId - Die ID des Benutzers.
 * @returns {Promise<Object>} Der Benutzer-Datensatz.
 */
function getCurrentUser(userId) {
  return firebase.firestore().collection('users').doc(userId).get()
    .then(doc => {
      if (doc.exists) {
        currentUser = { id: doc.id, ...doc.data() };
        return currentUser;
      } else {
        return Promise.reject(`Benutzer mit ID ${userId} nicht gefunden`);
      }
    });
}

/**
 * Speichert oder aktualisiert einen Benutzer.
 * @param {Object} userData - Das vollständige Benutzerobjekt (muss `id` enthalten).
 * @returns {Promise<void>}
 */
function saveUser(userData) {
  return firebase.firestore().collection('users').doc(userData.id).set(userData);
}

/**
 * Holt alle Kontakte eines Benutzers.
 * @param {string} userId - Die ID des Benutzers.
 * @returns {Promise<Array>} Liste von Kontaktobjekten.
 */
function getContacts(userId) {
  return firebase.firestore().collection('users').doc(userId).collection('contacts').get()
    .then(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
}

/**
 * Speichert einen einzelnen Kontakt (neu oder aktualisiert).
 * @param {string} userId - Die ID des Benutzers.
 * @param {Object} contact - Kontaktobjekt (muss `id` enthalten).
 * @returns {Promise<void>}
 */
function saveContact(userId, contact) {
  return firebase.firestore().collection('users').doc(userId).collection('contacts').doc(contact.id).set(contact);
}

/**
 * Löscht einen Kontakt.
 * @param {string} userId - Die ID des Benutzers.
 * @param {string} contactId - Die ID des Kontakts.
 * @returns {Promise<void>}
 */
function clearContact(userId, contactId) {
  return firebase.firestore().collection('users').doc(userId).collection('contacts').doc(contactId).delete();
}

/**
 * Loads users from Firebase, updates the current user's tasks based on `contactData`,
 * and then saves the updated users array to both localStorage and Firebase.
 * 
 * - Loads all users from Firebase first.
 * - Checks if `contactData` is a valid array with at least one element.
 * - Finds the current user in the `users` array by `currentUserId`.
 * - Updates the user data in the array and saves it locally and to Firebase.
 * - Logs warnings if the user is not found or `contactData` is invalid.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the save operation is complete.
 */
async function saveUserTasksToServer() {
  await loadUsersFromFirebase();
  if (Array.isArray(contactData) && contactData.length > 0) {
    const currentUserId = contactData[0].currentUserId;
    const userIndex = users.findIndex(user => user.currentUserId === currentUserId);
    if (userIndex !== -1) {
      users[userIndex] = contactData[0];
      await setItem('users', JSON.stringify(users));
      await setItem('currentUser', JSON.stringify(contactData[0]));
      try {
        await firebase.database().ref('data').set(JSON.stringify(users));
      } catch (error) {
        console.error('Fehler beim Speichern in Firebase:', error);
      }
    } else {
      console.warn('Benutzer nicht im Array gefunden');
    }
  } else {
    console.warn('contactData leer oder ungültig');
  }
}