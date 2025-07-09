let users = [];
let contactData = [];

/**
 * Stores a value in localStorage under the specified key.
 * Returns a Promise that resolves when the value has been set.
 *
 * @function
 * @param {string} key - The key under which to store the value.
 * @param {string} value - The value to store in localStorage.
 * @returns {Promise<void>} A promise that resolves once the value is stored.
 */
function setItem(key, value) {
  return new Promise((resolve) => {
    localStorage.setItem(key, value);
    resolve();
  });
}

/**
 * Retrieves an item from localStorage by key, returning a Promise that resolves with the value.
 *
 * @function
 * @param {string} key - The key of the item to retrieve from localStorage.
 * @returns {Promise<string|null>} A promise that resolves to the stored value, or null if the key does not exist.
 */
function getItem(key) {
  return new Promise((resolve) => {
    resolve(localStorage.getItem(key));
  });
}

/**
 * Loads user data from the Firebase Realtime Database under the 'data' reference.
 * Parses the stored JSON string and assigns it to the global `users` variable.
 * Logs the loaded users on success, or logs an error and resets `users` to an empty array on failure.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the load operation completes.
 */
async function loadUsersFromFirebase() {
  try {
    const snapshot = await firebase.database().ref('data').once('value');
    const jsonString = snapshot.val();
    users = jsonString ? JSON.parse(jsonString) : [];
  } catch (error) {
    console.error('Error loading users:', error);
    users = [];
  }
}

/**
 * Safely parses a JSON string into a JavaScript object.
 * If parsing fails, logs the error and returns an empty array.
 *
 * @function
 * @param {string} jsonString - The JSON string to parse.
 * @returns {Object|Array} The parsed object if successful; otherwise, an empty array.
 */
function safeParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('JSON parse error:', e);
    return [];
  }
}

/**
 * Saves the `users` data to the Firebase Realtime Database under the 'data' reference.
 *
 * The function serializes the `users` object to a JSON string before saving.
 * Logs a success message if saving succeeds, otherwise logs the error.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the save operation completes.
 */
async function saveUsersToFirebase() {
  try {
    await firebase.database().ref('data').set(JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users:', error);
  }
}

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
  addUserToArray();
  await setItem('users', JSON.stringify(users));
  await saveUsersToFirebase();
  showSuccessPopup();
  setTimeout(() => {
    resetForm();
    window.open('index.html', '_self');
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