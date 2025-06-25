let checkbox = false;
let globalUserData = [];

/**
 * This function changes the checkbox of the login page.
 * 
 */
function changeCheckbox() {
  if (!checkbox == true) {
    checkbox = true;
  } else {
    checkbox = false;
  }
  switchCheckboxImage();
}

/**
 * 
 * @event stopPropagation
 * @param {*} event 
 */
function stopPropagation(event) { 
  event.stopPropagation();
}

/**
 * Überprüft, ob das Datum im Eingabefeld gültig ist und es ggf. korrigiert.
 * @param {HTMLInputElement} input - Das Eingabefeld, das das Datum enthält.
 */
function validateDate(input) {
  let maxDate = new Date(input.getAttribute('max'));
  let inputDate = new Date(input.value);
  if (inputDate > maxDate) {
    input.value = input.getAttribute('max');
  }
}

async function initForExtern() {
  await includeHTML();
  checkForExternPage(); 

}

function checkForExternPage() {
  let path = window.location.pathname
    removeSidebar();
    removerUserLogo();
    removeHref(); 
    highlightPrivacyPolicy(path);
}

function removeSidebar() {
  document.getElementById('flex-list-container').innerHTML = '';
  let aside = document.querySelector('aside');
  aside.style.width = '200px';
  
  
}

function removerUserLogo() {
    document.getElementById('header-right-side').innerHTML = '';
  
}

function removeHref() {
  let linksToRemove = document.querySelectorAll('a[href="privacyPolicy.html"], a[href="legalNotice.html"]');
  linksToRemove.forEach(function(link) {
  link.removeAttribute('href');
  });
}

function highlightPrivacyPolicy(path) {
  if (path == '/assets/templates/privacyPolicyExtern.html') {
    let element = document.getElementById('privacy-list-element');
    element.style.backgroundColor = '#091931';
  }else {
    let element = document.getElementById('legalNotice-list-element');
    element.style.backgroundColor = '#091931';

  }
  
}

/**
 * This function changes the image of the checkbox in dependence of the checkbox.
 * 
 */
function switchCheckboxImage() { 
  if (!checkbox == false) {
    document.getElementById("notChecked").classList.add("d-none");
    document.getElementById("notChecked").classList.remove("d-block");
    document.getElementById("checked").classList.add("d-block");
    document.getElementById("checked").classList.remove("d-none");
  } else {
    document.getElementById("notChecked").classList.add("d-block");
    document.getElementById("notChecked").classList.remove("d-none");
    document.getElementById("checked").classList.add("d-none");
    document.getElementById("checked").classList.remove("d-block");
  }
}
 
/**
 * This function fills the input fields of the login form.
 * 
 * @param {*} event 
 */
async function guestLogin(event) { 
  event.preventDefault();
  document.getElementById('loginEmail').value = "guest@test.de";
  document.getElementById('loginPassword').value = "1234";
  loginUser();
}

/**
 * This function catches the value of the input fielder to find a user.
 * If the user is found, the user data is set as "currentUser" to the backend and the user is redirected to the summary.html.
 */
async function loginUser() { 
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;
  let user = users.find(
    (users) => users.email == email && users.password == password
  );
  if (!user) {
    getErrorMessage();
  } else {
    await setItem("currentUser", JSON.stringify(user));
    await getGlobalUserData();
    window.open("summary.html", "_self");
  }
}

/**
 * Retrieves global user data asynchronously from storage.
 * 
 * @async
 * @function getGlobalUserData
 * @returns {Object | null} The global user data retrieved from storage, or null if an error occurs.
 */
async function getGlobalUserData() {
  try {
    globalUserData = JSON.parse(await getItem("currentUser"));
    if (Array.isArray(contactData) && contactData.length === 0) {
      // console.log("In Global User data");
      contactData.push(globalUserData);
      // console.log("Kontaktdaten in summary", contactData);
      return globalUserData;
    } else {
    }
  } catch (error) {
    return null;
  }
}

/**
 * This function is called when the user has typed in the wrong password or email.
 * The border of the input fields become red.
 * 
 */
function getErrorMessage() { 
  loginEmail.style.border = "2px solid red";
  loginPassword.style.border = "2px solid red";
  document.getElementById("wrongPassword").classList.remove("d-none");
  rememberMe.classList.add("remember");
  document
    .getElementById("loginForm")
    .addEventListener("click", function (event) {
      event.stopPropagation();
    });
}

/**
 * This function is used to close the dropdown menu.
 * 
 */
function closeDropdownMenu() { 
  document.getElementById("submenuContainer").classList.add("d-none");
}

/**
 * This function is used to open the dropdown menu.
 * 
 */
function openDropdownMenu() { 
  document.getElementById("submenuContainer").classList.remove("d-none");
}
