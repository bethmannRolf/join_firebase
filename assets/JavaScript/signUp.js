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

/**
 * Loads existing users from the backend and stores them in the global users array.
 */
async function loadUsers() {
  try {
    const usersStr = await getItem('users');
    users = usersStr ? JSON.parse(usersStr) : [];
    console.log('users')
  } catch (e) {
    console.error('Loading error:', e);
    users = [];
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
      console.log('added user success')
      console.log('Contact Data',contactData)
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
