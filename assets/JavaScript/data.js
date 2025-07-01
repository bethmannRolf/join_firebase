// data.js - kompatibel mit Firebase v8 SDK

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

async function saveUserTasksToServer() {
  console.log('innerhalb von saveusertasks');
  await loadUsers();

  if (Array.isArray(contactData) && contactData.length > 0) {
    if (contactData[0].hasOwnProperty('currentUserId')) {
      const currentUserId = contactData[0].currentUserId;
      const userIndex = users.findIndex(user => user.currentUserId === currentUserId);

      if (userIndex !== -1) {
        users[userIndex] = contactData[0];
        await setItem('users', JSON.stringify(users));
        // await clearItem('currentUser');
        await setItem('currentUser', JSON.stringify(contactData[0]));

        try {
          console.log('Daten, die gespeichert werden sollen:', contactData[0]);

          // Statt Firestore → Realtime Database!
          await firebase.database()
            .ref(`users/${currentUserId}`)
            .set(contactData[0]);


          console.log('Tasks erfolgreich in Realtime Database gespeichert');
        } catch (error) {
          console.error('Fehler beim Speichern in Realtime Database:', error);
        }
      } else {
        console.warn('Benutzer nicht in users Array gefunden');
      }
    } else {
      console.warn('contactData[0] hat keine currentUserId');
    }
  } else {
    console.warn('contactData ist leer oder ungültig');
  }
}
