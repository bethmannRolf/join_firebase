let users = [];
let contactData = [];

function setItem(key, value) {
  return new Promise((resolve) => {
    localStorage.setItem(key, value);
    resolve();
  });
}

function getItem(key) {
  return new Promise((resolve) => {
    resolve(localStorage.getItem(key));
  });
}

// async function loadUsersFromFirebase() {
//   try {
//     const snapshot = await firebase.database().ref('users').once('value');
//     const data = snapshot.val();
//     users = data ? Object.values(data) : [];
//     console.log('Loaded users from Firebase:', users);
//   } catch (error) {
//     console.error('Error loading users from Firebase:', error);
//     users = [];
//   }
// }

async function loadUsersFromFirebase() {
  try {
    const snapshot = await firebase.database().ref('data').once('value');
    const jsonString = snapshot.val();
    users = jsonString ? JSON.parse(jsonString) : [];
    console.log('Users loaded:', users);
  } catch (error) {
    console.error('Error loading users:', error);
    users = [];
  }
}


function safeParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('JSON parse error:', e);
    return [];
  }
}







// function saveUsersToFirebase() {
//   firebase.database().ref('users').set(users);
// }

// async function saveUsersToFirebase() {
//   try {
//     debugger;
//     console.log('users', users)
//     await firebase.database().ref('users').set(users);
//     console.log('Saved to Firebase successfully');
//   } catch (e) {
//     console.error('Saving to Firebase failed:', e);
//   }
// }

async function saveUsersToFirebase() {
  try {
    await firebase.database().ref('data').set(JSON.stringify(users));
    console.log('Users saved successfully');
  } catch (error) {
    console.error('Error saving users:', error);
  }
}








/**
 * Loads existing users from the backend and stores them in the global users array.
 */
// async function loadUsers() {
//   try {
//     const usersStr = await getItem('users');
//     users = usersStr ? JSON.parse(usersStr) : [];
//     console.log('Loaded users:', users); // <- Hilfreich!
//   } catch (e) {
//     console.error('Loading error:', e);
//     users = [];
//   }
// }


/**
 * Validates password match and checkbox agreement, then registers the user.
 */
async function registerUser() {
  if (password.value !== confirmPassword.value) {
    showPasswordMismatch();
    return;
  }

  if (!checkbox) {
    alert('Please accept the Privacy Policy!');
    return;
  }

  // await loadUsersFromFirebase(); 
  await registerSuccessfully();
}


/**
 * Highlights mismatched password fields and shows error message.
 */
function showPasswordMismatch() {
  password.style.border = '2px solid red';
  confirmPassword.style.border = '2px solid red';
  document.getElementById('passwordNotMatch').classList.remove('d-none');
  PPContainer.style.bottom = '92px';
}

/**
 * Adds new user to array and backend, shows success popup and redirects to login.
 */
async function registerSuccessfully() {
  addUserToArray();                   // Benutzer in Array einfügen
  await setItem('users', JSON.stringify(users)); 
  
  await saveUsersToFirebase();       // Firebase speichern, mit await!
  showSuccessPopup();                // erst dann Feedback zeigen

  setTimeout(() => {
    resetForm();
    window.open('index.html', '_self');  // und dann Weiterleitung
  }, 1000);
}



/**
 * Pushes the new user object to the users array.
 */
function addUserToArray() {
  users.push({
    currentUserId: users.length + 1,
    tasks: [{
      toDo: [],
      inProgress: [],
      awaitFeedback: [],
      done: []
    }],
    contacts: [],
    userName: userName.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value
  });

  console.log('added user success');
  console.log('Contact Data', contactData);
}


/**
 * Displays registration success popup for a short time.
 */
function showSuccessPopup() {
  const popUp = document.getElementById('animationSignUp');
  popUp.classList.add('show');
  setTimeout(() => popUp.classList.remove('show'), 1000);
}

/**
 * Resets the registration form and checkbox state.
 */
function resetForm() {
  userName.value = '';
  email.value = '';
  password.value = '';
  confirmPassword.value = '';
  password.style.border = '';
  confirmPassword.style.border = '';
  changeCheckbox();
}




// function cleanUserAfterFirebaseLoad(user) {
//   const userCopy = structuredClone(user);

//   if (
//     Array.isArray(userCopy.tasks) &&
//     userCopy.tasks.length > 0 &&
//     typeof userCopy.tasks[0] === 'object'
//   ) {
//     for (const key in userCopy.tasks[0]) {
//       if (
//         Array.isArray(userCopy.tasks[0][key]) &&
//         userCopy.tasks[0][key].length === 1 &&
//         userCopy.tasks[0][key][0] === '__placeholder__'
//       ) {
//         userCopy.tasks[0][key] = [];
//       }
//     }
//   }

//   if (
//     Array.isArray(userCopy.contacts) &&
//     userCopy.contacts.length === 1 &&
//     userCopy.contacts[0] === '__placeholder__'
//   ) {
//     userCopy.contacts = [];
//   }

//   return userCopy;
// }


// function cleanUserAfterFirebaseLoad(user) {
//   // Platzhalter "__EMPTY__" in contacts entfernen
//   if (Array.isArray(user.contacts) && user.contacts[0] === '__EMPTY__') {
//     user.contacts = [];
//   }

//   // Sicherstellen, dass tasks vorhanden ist und korrekt aufgebaut ist
//   if (!Array.isArray(user.tasks) || user.tasks.length === 0) {
//     user.tasks = [{
//       toDo: [],
//       inProgress: [],
//       awaitFeedback: [],
//       done: []
//     }];
//   } else {
//     const taskGroups = ['toDo', 'inProgress', 'awaitFeedback', 'done'];

//     taskGroups.forEach(group => {
//       if (!Array.isArray(user.tasks[0][group])) {
//         user.tasks[0][group] = [];
//       } else if (user.tasks[0][group][0] === '__EMPTY__') {
//         user.tasks[0][group] = [];
//       }
//     });
//   }

//   return user;
// }







// function prepareUserForFirebase(user) {
//   const userCopy = structuredClone(user);

//   if (
//     Array.isArray(userCopy.tasks) &&
//     userCopy.tasks.length > 0 &&
//     typeof userCopy.tasks[0] === 'object'
//   ) {
//     for (const key in userCopy.tasks[0]) {
//       if (
//         Array.isArray(userCopy.tasks[0][key]) &&
//         userCopy.tasks[0][key].length === 0
//       ) {
//         userCopy.tasks[0][key].push('__placeholder__');
//       }
//     }
//   }

//   if (Array.isArray(userCopy.contacts) && userCopy.contacts.length === 0) {
//     userCopy.contacts.push('__placeholder__');
//   }

//   return userCopy;
// }

// function prepareUserForFirebase(user) {
//   const clone = structuredClone(user); // Sichere Kopie

//   const taskGroups = ['toDo', 'inProgress', 'awaitFeedback', 'done'];

//   if (Array.isArray(clone.tasks)) {
//     for (const taskGroup of taskGroups) {
//       if (Array.isArray(clone.tasks[0]?.[taskGroup]) && clone.tasks[0][taskGroup].length === 0) {
//         clone.tasks[0][taskGroup] = ['__EMPTY__'];
//       }
//     }

//     if (isEmptyTaskObject(clone.tasks[0])) {
//       clone.tasks = []; // komplett entfernen, wenn wirklich leer
//     }
//   }

//   if (Array.isArray(clone.contacts) && clone.contacts.length === 0) {
//     clone.contacts = ['__EMPTY__'];
//   }

//   return clone;
// }

// function restoreUserFromFirebase(user) {
//   // Restore contacts
//   if (Array.isArray(user.contacts) && user.contacts[0] === '__EMPTY__') {
//     user.contacts = [];
//   }

//   // Restore tasks
//   if (!Array.isArray(user.tasks) || user.tasks.length === 0) {
//     user.tasks = [{
//       toDo: [],
//       inProgress: [],
//       awaitFeedback: [],
//       done: []
//     }];
//   } else {
//     const taskGroups = ['toDo', 'inProgress', 'awaitFeedback', 'done'];
//     for (const group of taskGroups) {
//       if (Array.isArray(user.tasks[0][group]) && user.tasks[0][group][0] === '__EMPTY__') {
//         user.tasks[0][group] = [];
//       }
//     }
//   }

//   return user;
// }
