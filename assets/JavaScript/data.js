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

// async function saveUserTasksToServer() {
//   await loadUsersFromFirebase();
//   if (Array.isArray(contactData) && contactData.length > 0) {
//     if (contactData[0].hasOwnProperty('currentUserId')) {
//       const currentUserId = contactData[0].currentUserId;
//       const userIndex = users.findIndex(user => user.currentUserId === currentUserId);

//       if (userIndex !== -1) {
//         users[userIndex] = contactData[0];
//         await setItem('users', JSON.stringify(users));
//         // await clearItem('currentUser');
//         await setItem('currentUser', JSON.stringify(contactData[0]));
//         try {
//           await firebase.database()
//             .ref(`users/${currentUserId}`)
//             .set(contactData[0]);
//         } catch (error) {
//           console.error('Fehler beim Speichern in Realtime Database:', error);
//         }
//       } else {
//         console.warn('Benutzer nicht in users Array gefunden');
//       }
//     } else {
//       console.warn('contactData[0] hat keine currentUserId');
//     }
//   } else {
//     console.warn('contactData ist leer oder ungültig');
//   }
//   console.log('Tasks werden gespeichert:', contactData[0].tasks);

// }

async function saveUserTasksToServer() {
  await loadUsersFromFirebase(); // lädt users-Array aus 'data'

  if (Array.isArray(contactData) && contactData.length > 0) {
    const currentUserId = contactData[0].currentUserId;
    const userIndex = users.findIndex(user => user.currentUserId === currentUserId);

    if (userIndex !== -1) {
      users[userIndex] = contactData[0];

      // lokale Speicherung
      await setItem('users', JSON.stringify(users));
      await setItem('currentUser', JSON.stringify(contactData[0]));

      try {
        await firebase.database().ref('data').set(JSON.stringify(users)); // Zentrale Speicherung
        console.log('Tasks gespeichert (neues Format)', contactData[0].tasks);
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






// async function saveUserTasksToServer() {
//   // 1. Stelle sicher, dass die users geladen sind
//   if (!users || users.length === 0) {
//     await loadUsersFromFirebase();
//   }

//   // 2. Validierung
//   if (!Array.isArray(contactData) || contactData.length === 0) {
//     console.warn('contactData ist leer oder ungültig');
//     return;
//   }

//   const currentUser = contactData[0];

//   if (!currentUser.hasOwnProperty('currentUserId')) {
//     console.warn('contactData[0] hat keine currentUserId');
//     return;
//   }

//   const userIndex = users.findIndex(user => user.currentUserId === currentUser.currentUserId);

//   if (userIndex === -1) {
//     console.warn('Benutzer nicht im users-Array gefunden');
//     return;
//   }

//   // 3. Platzhalter setzen (damit leere Arrays gespeichert werden können)
//   const preparedUser = prepareUserForFirebase(currentUser);

//   // 4. User im Array ersetzen & speichern
//   users[userIndex] = preparedUser;
//   await setItem('users', JSON.stringify(users));
//   await setItem('currentUser', JSON.stringify(preparedUser));

//   // 5. In Firebase schreiben
//   try {
//     await firebase.database()
//       .ref(`users/${currentUser.userName}`) // ggf. userName statt currentUserId
//       .set(preparedUser);
//     console.log('User-Daten erfolgreich gespeichert.');
//   } catch (error) {
//     console.error('Fehler beim Speichern in Firebase:', error);
//   }
// }


