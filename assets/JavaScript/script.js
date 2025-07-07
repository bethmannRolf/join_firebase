let checkbox = false;
let globalUserData = [];

/**
 * Toggles the checkbox state and updates its image.
 */
function changeCheckbox() {
  checkbox = !checkbox;
  switchCheckboxImage();
}

/**
 * Stops event propagation.
 * @param {Event} event - The triggered event.
 */
function stopPropagation(event) {
  event.stopPropagation();
}

/**
 * Validates the date input to ensure it doesn't exceed the max date.
 * @param {HTMLInputElement} input - The date input element.
 */
function validateDate(input) {
  const maxDate = new Date(input.getAttribute('max'));
  const inputDate = new Date(input.value);
  if (inputDate > maxDate) {
    input.value = input.getAttribute('max');
  }
}

/**
 * Initializes the page if it's loaded externally.
 */
async function initForExtern() {
  await includeHTML();
  checkForExternPage();
}

/**
 * Adjusts the layout if the page is an external legal/privacy page.
 */
function checkForExternPage() {
  const path = window.location.pathname;
  removeSidebar();
  removeUserLogo();
  removeHref();
  highlightPrivacyPolicy(path);
}

/**
 * Clears the sidebar content and reduces its width.
 */
function removeSidebar() {
  document.getElementById('flex-list-container').innerHTML = '';
  const aside = document.querySelector('aside');
  aside.style.width = '200px';
}

/**
 * Removes the user logo from the header.
 */
function removeUserLogo() {
  document.getElementById('header-right-side').innerHTML = '';
}

/**
 * Removes href from specific links to prevent navigation.
 */
function removeHref() {
  const linksToRemove = document.querySelectorAll(
    'a[href="privacyPolicy.html"], a[href="legalNotice.html"]'
  );
  linksToRemove.forEach(link => link.removeAttribute('href'));
}

/**
 * Highlights the appropriate sidebar element depending on the current path.
 * @param {string} path - Current page path.
 */
function highlightPrivacyPolicy(path) {
  const privacyElement = document.getElementById('privacy-list-element');
  const legalElement = document.getElementById('legalNotice-list-element');
  const highlightColor = '#091931';

  if (path.includes('privacyPolicyExtern.html')) {
    privacyElement.style.backgroundColor = highlightColor;
  } else {
    legalElement.style.backgroundColor = highlightColor;
  }
}

/**
 * Updates checkbox visuals based on its state.
 */
function switchCheckboxImage() {
  const notChecked = document.getElementById('notChecked');
  const checked = document.getElementById('checked');

  if (checkbox) {
    notChecked.classList.add('d-none');
    notChecked.classList.remove('d-block');
    checked.classList.add('d-block');
    checked.classList.remove('d-none');
  } else {
    notChecked.classList.add('d-block');
    notChecked.classList.remove('d-none');
    checked.classList.add('d-none');
    checked.classList.remove('d-block');
  }
}

/**
 * Fills the login form with guest credentials and logs in.
 * @param {Event} event - Click event from guest login button.
 */
async function guestLogin(event) {
  event.preventDefault();
  document.getElementById('loginEmail').value = 'guest@test.de';
  document.getElementById('loginPassword').value = '1234';
  loginUser();
}

/**
 * Attempts to log the user in with the provided credentials.
 */
async function loginUser() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const user = users.find(u => u.email === email && u.password === password);
  console.log('user found')
  if (!user) {
    getErrorMessage();
  } else {
    localStorage.setItem('currentUser', JSON.stringify(user));

    await getGlobalUserData();
    window.open('summary.html', '_self');
  }
}

/**
 * Loads global user data into memory.
 * @returns {Promise<Object|null>} The user data or null if an error occurred.
 */
async function getGlobalUserData() {
  try {
    globalUserData = JSON.parse(await getItem('currentUser'));

    if (Array.isArray(contactData) && contactData.length === 0) {
      contactData.push(globalUserData);
      console.log('Contact Data von globaluserdata', contactData)
      console.log('getGlobalUserData Success')
      return globalUserData;
    }
  } catch (error) {
    return null;
  }
}

/**
 * Displays an error when login credentials are incorrect.
 */
function getErrorMessage() {
  document.getElementById('loginEmail').style.border = '2px solid red';
  document.getElementById('loginPassword').style.border = '2px solid red';
  document.getElementById('wrongPassword').classList.remove('d-none');
  document.getElementById('rememberMe')?.classList.add('remember');

  document.getElementById('loginForm')?.addEventListener('click', stopPropagation);
}

/**
 * Closes the dropdown menu.
 */
function closeDropdownMenu() {
  document.getElementById('submenuContainer').classList.add('d-none');
}

/**
 * Opens the dropdown menu.
 */
function openDropdownMenu() {
  document.getElementById('submenuContainer').classList.remove('d-none');
}