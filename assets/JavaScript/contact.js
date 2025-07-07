let listElementIds = [];
let currentListItem;
let currentContactId;
let isMobileContactListCloned = false;

/**
 * Stops the propagation of an event.
 * @param {Event} event - The event object.
 * @returns {void}
 */
function stopPropagation(event) {
  event.stopPropagation();
}

/**
 * Opens the add contact popup.
 * Depending on the window width, either the desktop or mobile version of the popup is displayed.
 * @returns {void}
 */
function openAddContactPopup() {
let AddContactPopup = document.getElementById('addContactPopup');
let mobileAddContactPopup = document.getElementById('addContactPopupMobile');
if (window.innerWidth <= 1024) {
  swipeInPopupMobile(mobileAddContactPopup);
}
else {
    swipeInPopupDesktop(AddContactPopup);
}
  resetInputvalues();
}

/**
 * Animates the mobile version of the add contact popup.
 * @param {HTMLElement} mobileAddContactPopup - The mobile add contact popup element.
 * @returns {void}
 */
function swipeInPopupMobile(mobileAddContactPopup) {
  document.getElementById("addContactPopupMobile").classList.remove("d-none");
    mobileAddContactPopup.classList.remove('d-none');
    mobileAddContactPopup.style.animation = 'swipeInPopupMobile 0.8s forwards';
    document.getElementById("darkBackgroundContainer").classList.remove("d-none");
    document.getElementById("darkBackgroundContainer").classList.remove("swipeOutBackground");
}

/**
 * Animates the desktop version of the add contact popup.
 * @param {HTMLElement} AddContactPopup - The desktop add contact popup element.
 * @returns {void}
 */
function swipeInPopupDesktop(AddContactPopup) {
  AddContactPopup.classList.remove('d-none');
    AddContactPopup.style.animation = 'swipeInPopup 0.8s forwards';
    document.getElementById("darkBackgroundContainer").classList.remove("d-none");
    document.getElementById("darkBackgroundContainer").classList.remove("swipeOutBackground");
}

/**
 * Resets the input values for adding a new contact.
 * Clears the input fields for name, email, and phone number.
 * @returns {void}
 */
function resetInputvalues() {
  document.getElementById('newContactName').value = "";
  document.getElementById('newContactEmail').value = "";
  document.getElementById('newContactPhone').value = "";
  document.getElementById('newContactNameMobile').value = "";
  document.getElementById('newContactEmailMobile').value = "";
  document.getElementById('newContactPhoneMobile').value = "";
}

/**
 * Closes the add contact popup.
 * Depending on the window width, either the desktop or mobile version of the popup is closed.
 * @returns {void}
 */
function closeAddContactPopup() {
  let AddContactPopup = document.getElementById('addContactPopup');
  let EditContactPopup = document.getElementById('editContactPopup');
  let mobileAddContactPopup = document.getElementById('addContactPopupMobile');

  if (window.innerWidth <= 1024) {
    closeAddContactPopupOnSmallWidth(mobileAddContactPopup);
  }else {
    closeAddContactPopupOnBigWidth(AddContactPopup, EditContactPopup, mobileAddContactPopup)
  }
}

/**
 * Closes the add contact popup when the window width is small.
 * @param {HTMLElement} mobileAddContactPopup - The mobile add contact popup element.
 * @returns {void}
 */
function closeAddContactPopupOnSmallWidth(mobileAddContactPopup) {
  mobileAddContactPopup.style.animation = 'swipeOutPopupMobile 0.8s forwards';
  setTimeout(function() {
    mobileAddContactPopup.classList.add('d-none');
    document.getElementById("darkBackgroundContainer").classList.add("swipeOutBackground");
    document.getElementById("darkBackgroundContainer").classList.add("d-none");
  }, 300);// Wartezeit, um sicherzustellen, dass die Animation abgeschlossen ist, bevor die Klasse hinzugefügt wird
}

/**
 * Closes the add contact popup when the window width is big.
 * @param {HTMLElement} AddContactPopup - The add contact popup element.
 * @param {HTMLElement} EditContactPopup - The edit contact popup element.
 * @param {HTMLElement} mobileAddContactPopup - The mobile add contact popup element.
 * @returns {void}
 */
function closeAddContactPopupOnBigWidth(AddContactPopup, EditContactPopup, mobileAddContactPopup) {
  AddContactPopup.style.animation = 'swipeOutPopup 0.8s forwards';
  EditContactPopup.style.animation = 'swipeOutPopup 0.8s forwards';
  setTimeout(function() {
  AddContactPopup.classList.add('d-none');
  mobileAddContactPopup.classList.add('d-none');
  EditContactPopup.classList.add('d-none');
  document.getElementById("darkBackgroundContainer").classList.add("swipeOutBackground");
  document.getElementById("darkBackgroundContainer").classList.add("d-none");
}, 300);// Wartezeit, um sicherzustellen, dass die Animation abgeschlossen ist, bevor die Klasse hinzugefügt wird
setTimeout(myStopFunction, 250);
}

/**
 * Stops the animation and hides the dark background container.
 * @returns {void}
 */
function myStopFunction() {
  document.getElementById("darkBackgroundContainer").classList.add("d-none");
  document.getElementById("darkBackgroundContainer").classList.remove("darkBackground");
}

/**
 * Renders the contact list on the webpage.
 * @returns {Promise<void>}
 */
async function render() {
    await initUser();
  let initials = Array.from( new Set( contactData[0]['contacts'].map( (contact) => contact.name.charAt(0).toUpperCase() ) ) );
  initials.sort();
  let contactListContainer = document.getElementById("contactList");
  contactListContainer.innerHTML = "";
  setInitialsAndListItem(initials,contactListContainer)
  if (!isMobileContactListCloned) {
   setMobileContactList(contactListContainer);
  } else {
    mobileContactList.innerHTML = ""; // Bereite vor, um die aktualisierte Liste einzufügen
  }
  mobileContactList.innerHTML = contactListContainer.innerHTML;
}

/**
 * Creates a mobile version of the contact list and appends it to the document body.
 * @param {HTMLElement} contactListContainer - The container element containing the contact list.
 * @returns {HTMLElement} The cloned mobile contact list.
 */
function setMobileContactList(contactListContainer) {
  let mobileContactList = contactListContainer.cloneNode(true);
  mobileContactList.id = 'mobileContactList';
  mobileContactList.classList.add('mobileContactList')
  document.body.appendChild(mobileContactList);
  isMobileContactListCloned = true;
  return mobileContactList;
}

/**
 * Sets initials and corresponding contact list items in the contact list container.
 * @param {string[]} initials - The list of initials.
 * @param {HTMLElement} contactListContainer - The container element for the contact list.
 * @returns {void}
 */
function setInitialsAndListItem(initials,contactListContainer) {
  for (let i = 0; i < initials.length; i++) {
    let initial = initials[i];
    let variables = setInitials(initial, contactListContainer);
    for (let j = 0; j < variables.filteredContacts.length; j++) {
      let contact = variables.filteredContacts[j];
      setTrying(contact, i, j, initials, variables, initial);
    }
    contactListContainer.appendChild(variables.namesList);
  }
}

/**
 * Sets up the individual contact list item for a contact.
 * @param {Object} contact - The contact object.
 * @param {number} i - The index of the initial.
 * @param {number} j - The index of the contact within the filtered contacts list.
 * @param {string[]} initials - The list of initials.
 * @param {Object} variables - The variables object.
 * @param {string} initial - The initial for the current iteration.
 * @returns {void}
 */
function setTrying(contact, i, j, initials, variables, initial) {
let userProfilInitials =
        contact["firstname"].charAt(0) + contact["name"].charAt(0);
      let avatarColor = contact["avatarColor"];
      let listItem = document.createElement("li");
      let listElementId = `contactItem_${initial}_${j}`;
      listItem.id = listElementId;
      if (!listElementIds.includes(listElementId)) {
      listElementIds.push(listElementId);
      }
      listItem.innerHTML = showContactList(j, initials, i, avatarColor, userProfilInitials, contact.firstname, contact.name, contact.email); 
      listItem.classList.add("contact-item");
      variables.namesList.appendChild(listItem);
}

/**
 * Sets up the initial header and creates a list of contacts for a specific initial.
 * @param {string} initial - The initial for which the contacts are being listed.
 * @param {HTMLElement} contactListContainer - The container element for the contact list.
 * @returns {Object} An object containing the filtered contacts and the names list.
 */
function setInitials(initial, contactListContainer) {
let initialHeader = document.createElement("h2");
initialHeader.textContent = initial;
initialHeader.classList.add("initial-header");
contactListContainer.appendChild(initialHeader);
let filteredContacts = filterContactsByFirstLetter(contactData, initial); // contactList 
let namesList = document.createElement("ul");
namesList.classList.add("names-list");
return {
  filteredContacts,
  namesList
}
}

/**
 * Filters contacts by the first letter of their name.
 * @param {Array} contactData - The array containing contact data.
 * @param {string} firstLetter - The first letter to filter contacts by.
 * @returns {Array} - An array of contacts whose names start with the specified letter.
 */
function filterContactsByFirstLetter(contactData, firstLetter) {
  const filteredContacts = [];
  const contactList = contactData[0]['contacts'];
  for (let i = 0; i < contactList.length; i++) {
    const contact = contactList[i];
    if (
      contact.name.charAt(0).toUpperCase() === firstLetter.toUpperCase()
    ) {
      filteredContacts.push(contact);
    }
  }
  return filteredContacts;
}

/**
 * Displays contact information for the specified contact index and initial.
 * If the window width is less than or equal to 1024 pixels, displays the mobile version of the contact.
 * @param {number} contactIndex - The index of the contact in the filtered contacts list.
 * @param {string} initial - The initial of the contact's name.
 * @returns {void}
 */
function showContactInfo(contactIndex, initial) {
  if (window.innerWidth <= 1024) {
    document.getElementById('currentContactMobile').classList.remove('d-none');
  } 
  const contact = filterContactsByFirstLetter(contactData, initial)[contactIndex];
  currentListItem = "contactItem_" + initial + "_" + contactIndex;
  currentContactId = contact.id;
  let mobileVersionOrDesktop = window.innerWidth <= 1024 ? "currentContactMobile" : "current-contact";
  let contactInfo = document.getElementById(mobileVersionOrDesktop);
  if (window.innerWidth <= 1024) {
    showDesktopContactList();
  }
  contactInfo.innerHTML = "";
  contactInfo.innerHTML += showContactInfoTemplate(contact);
  ListElementBackground();
}

/**
 * Sets the background style for the list element corresponding to the current contact.
 * Resets the styles for all list elements and iterates through the contact list array.
 * Compares the IDs of the contacts to the current contact ID and applies styles to the matching list item.
 * @returns {void}
 */
function ListElementBackground() {
  resetListElementStyles();
  contactList = contactData[0]['contacts'];
  for (let i = 0; i < contactList.length; i++) {
    const id = contactList[i]["id"];
    if (id === currentContactId) {
      const listItem = document.getElementById(currentListItem);
      if (listItem) {
        stylingListItem(listItem); 
      }
      break; // Beende die Schleife, da das gesuchte Element gefunden wurde
    }
  }
}

/**
 * Applies styling to a list item after a delay.
 * @param {HTMLElement} listItem - The list item element to style.
 * @returns {void}
 */
function stylingListItem(listItem) {
  setTimeout(() => {
    listItem.style.backgroundColor = "#2A3647";
    listItem.style.borderRadius = "10px";
    listItem.style.color = "#FFFFFF";
  }, 100);
}

/**
 * Resets the styles for all list elements.
 * Iterates through the listElementIds array and resets the background color, border radius, and text color for each list item.
 * @returns {void}
 */
function resetListElementStyles() {
  listElementIds.forEach(id => {
      const listItem = document.getElementById(id);
      if (listItem) {
          listItem.style.backgroundColor = "";
          listItem.style.borderRadius = "";
          listItem.style.color = "";
      }
  });
}

/**
 * Creates a new contact based on the input values provided by the user.
 * Parses the input values for the contact's full name, email, and phone number.
 * Capitalizes the first letter of the first name and last name.
 * Generates a random avatar color for the new contact.
 * Adds the new contact to the contact list, assigns a unique ID, and saves the updated data to local storage.
 * Displays a success message popup and updates the contact list after a delay.
 * @returns {void}
 */
async function createNewContact() {
  let detailSightVariables = variablesForDetailSight(); 
  firstname = detailSightVariables.firstname.charAt(0).toUpperCase() + detailSightVariables.firstname.slice(1);
  lastname = detailSightVariables.name.charAt(0).toUpperCase() + detailSightVariables.name.slice(1);
  const newContact = {
    firstname: firstname,
    name: lastname,
    avatarColor: getRandomAvatarColor(),
    email: detailSightVariables.email,
    phoneNumber: detailSightVariables.phone,
  };
  let setedID = setId(detailSightVariables.contacts, newContact);
  await saveRenderAndClose(setedID);
}

/**
 * Sets variables for displaying contact details.
 * @returns {Object} - An object containing variables for displaying contact details.
 */
function variablesForDetailSight() {
  let fullname = document.getElementById("newContactName").value || document.getElementById("newContactNameMobile").value;
  let spaceIndex = fullname.indexOf(" ");
  let firstname = fullname.substring(0, spaceIndex);
  let name = fullname.substring(spaceIndex + 1);
  let email = document.getElementById("newContactEmail").value || document.getElementById("newContactEmailMobile").value;
  let phone = document.getElementById("newContactPhone").value || document.getElementById("newContactPhoneMobile").value;
  contacts = contactData[0]['contacts'];
  return {
    fullname,
    spaceIndex,
    firstname,
    name,
    email,
    phone,
    contacts
  }
}

/**
 * Sets an ID for a new contact based on the maximum existing ID in the contact list.
 * @param {Array} detailSightVariablescontacts - Array of existing contacts.
 * @param {Object} newContact - The new contact object to set the ID for.
 * @returns {Object} - The new contact object with the ID set.
 */
function setId(detailSightVariablescontacts, newContact) {
  let maxId = -1;
  for (const contact of detailSightVariablescontacts) {
      if (contact.id > maxId) {
          maxId = contact.id;
      }
  }
  newContact.id = maxId + 1;
  return newContact;
}

/**
 * Saves the new contact, renders the updated contact list, and closes the add contact popup.
 * @param {Object} setedID - The new contact object with set ID.
 * @returns {Promise<void>}
 */
async function saveRenderAndClose(setedID) {
  contactData[0]['contacts'].push(setedID);
  await setItem('currentUser', contactData[0]);
  contactSuccesfullyCreatedPopUp();
  setTimeout(() => {
  render();
  closeAddContactPopup(); 
}, 500); 
}

/**
 * Generates a random avatar color from a predefined list of colors.
 * @returns {string} - A randomly selected color from the list.
 */
function getRandomAvatarColor() {
  const colors = [
    "blue", "green", "orange", "pink", "purple", "red", "turquoise",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

/**
 * Opens the edit current contact popup and populates the input fields with the details of the selected contact for editing.
 * If the window width is less than or equal to 1024 pixels, populates the input fields in the mobile version of the popup.
 * @param {number} contactID - The ID of the contact to be edited.
 * @returns {void}
 */
function editCurrentContact(contactID) {
  openEditCurrentContactPopUp();

  if (window.innerWidth <= 1024) {
    setInputsOnSmallEditPopup(contactID)
  } 
  else {
    setInputsOnBigEditPopup(contactID)
  }
}

/**
 * Sets input values and displays the contact avatar on the small edit popup based on the contact ID.
 * @param {number} contactID - The ID of the contact to set inputs for.
 * @returns {void}
 */
function setInputsOnSmallEditPopup(contactID) {
  for (let i = 0; i < contactData[0]['contacts'].length; i++) {
    let contactID = currentContactId;
    if (contactData[0]['contacts'][i].id === contactID) {
      document.getElementById('editContactNameMobile').value = contactData[0]['contacts'][i].firstname + " " + contactData[0]['contacts'][i].name;
      document.getElementById('editContactEmailMobile').value = contactData[0]['contacts'][i].email;
      document.getElementById('editContactPhoneMobile').value = contactData[0]['contacts'][i].phoneNumber;

      const editContactIconDivMobile = document.getElementById("editContactIconDivMobile");
      let formatedInitials = contactData[0]['contacts'][i]["firstname"].charAt(0) + contactData[0]['contacts'][i]["name"].charAt(0);
      let formatedColor = contactData[0]['contacts'][i]["avatarColor"];
      editContactIconDivMobile.innerHTML = showCurrentContactCircleMobile(formatedInitials, formatedColor);
      break;
    }
  }
}

/**
 * Sets input values and displays the contact avatar on the big edit popup based on the contact ID.
 * @param {number} contactID - The ID of the contact to set inputs for.
 * @returns {void}
 */
function setInputsOnBigEditPopup(contactID) {
  for (let i = 0; i < contactData[0]['contacts'].length; i++) {1
    if (contactData[0]['contacts'][i].id === contactID) {
        document.getElementById('editContactName').value = contactData[0]['contacts'][i].firstname + " " + contactData[0]['contacts'][i].name;
        document.getElementById('editContactEmail').value = contactData[0]['contacts'][i].email;
        document.getElementById('editContactPhone').value = contactData[0]['contacts'][i].phoneNumber;
        const editContactIconDiv = document.getElementById("editContactIconDiv");
        let formatedInitials = contactData[0]['contacts'][i]["firstname"].charAt(0) + contactData[0]['contacts'][i]["name"].charAt(0);
        let formatedColor = contactData[0]['contacts'][i]["avatarColor"];
        editContactIconDiv.innerHTML = showCurrentContactCircle(formatedInitials, formatedColor);
        break;
      }
    }
}

/**
 * Opens the edit current contact popup.
 * If the window width is less than or equal to 1024 pixels, opens the mobile version of the popup.
 * @returns {void}
 */
function openEditCurrentContactPopUp() {
  let EditContactPopup = document.getElementById('editContactPopup');
  let mobileEditContactPopup = document.getElementById('editContactPopupMobile');
  if (window.innerWidth <= 1024) {
    openEditPopupSmallWidth(mobileEditContactPopup); 
  }
  else {
    openEditPopupBigWidth(EditContactPopup); 
  }
}

/**
 * Opens the edit contact popup when the window width is small.
 * @param {HTMLElement} mobileEditContactPopup - The mobile edit contact popup element.
 * @returns {void}
 */
function openEditPopupSmallWidth(mobileEditContactPopup) {
  mobileEditContactPopup.classList.remove('d-none');
  mobileEditContactPopup.style.animation = 'swipeInPopupMobile 0.8s forwards';
  document.getElementById("darkBackgroundContainer").classList.remove("d-none");
  document.getElementById("darkBackgroundContainer").classList.remove("swipeOutBackground");
}

/**
 * Opens the edit contact popup when the window width is big.
 * @param {HTMLElement} mobileEditContactPopup - The mobile edit contact popup element.
 * @returns {void}
 */
function openEditPopupBigWidth(EditContactPopup) {
  EditContactPopup.classList.remove('d-none');
  EditContactPopup.style.animation = 'swipeInPopup 0.8s forwards';
  document.getElementById("darkBackgroundContainer").classList.remove("swipeOutBackground");
  document.getElementById("darkBackgroundContainer").classList.remove("d-none");
}

/**
 * Closes the edit contact popup.
 * If the window width is less than or equal to 1024 pixels, closes the mobile version of the popup.
 * @returns {void}
 */
function closeEditContactPopup() {
  let EditContactPopup = document.getElementById('editContactPopup');
  let mobileEditContactPopup = document.getElementById('editContactPopupMobile');
  if (window.innerWidth <= 1024) {
    closeEditPopupSmallWidth(mobileEditContactPopup);
}
else {
  closeEditPopupBigWidth(EditContactPopup);
  }
}

/**
 * Closes the edit contact popup when the window width is small.
 * @param {HTMLElement} mobileEditContactPopup - The mobile edit contact popup element.
 * @returns {void}
 */
function closeEditPopupSmallWidth(mobileEditContactPopup) {
  mobileEditContactPopup.style.animation = 'swipeOutPopupMobile 0.8s forwards';
  setTimeout(function() {
    mobileEditContactPopup.classList.add('d-none');
    document.getElementById("darkBackgroundContainer").classList.add("swipeOutBackground");
    document.getElementById("darkBackgroundContainer").classList.add("d-none");
  }, 300);
}

/**
 * Closes the edit contact popup when the window width is big.
 * @param {HTMLElement} mobileEditContactPopup - The mobile edit contact popup element.
 * @returns {void}
 */
function closeEditPopupBigWidth(EditContactPopup) {
  EditContactPopup.style.animation = 'swipeOutPopup 0.8s forwards';
    setTimeout(function() {
      EditContactPopup.classList.add('d-none');
      document.getElementById("darkBackgroundContainer").classList.add("swipeOutBackground");
      document.getElementById("darkBackgroundContainer").classList.add("d-none");
    }, 300);
}

/**
 * Deletes the current contact with the specified ID.
 * Removes the contact from the contact list, updates the listElementIds array, and clears the contact from the backend.
 * Clears the content of the current contact container, closes the edit contact popup, saves the updated contact list, and re-renders the UI.
 * @param {number} contactID - The ID of the contact to be deleted.
 * @returns {void}
 */
async function deleteCurrentContact(contactID) {
  await spliceAndSaveContact(contactID);
  if (window.innerWidth >= 1024) {
    let currentContactContainer = document.getElementById("current-contact");
    currentContactContainer.innerHTML = "";
    closeEditContactPopup();
  } else {
    goBackToMobileContactList();
  }
  await saveContacts(contactData[0]['contacts']);
  render();
}

/**
 * Removes a contact from the contact data array and saves the changes.
 * @param {number} contactID - The ID of the contact to be removed.
 * @returns {Promise<void>}
 */
async function spliceAndSaveContact(contactID) {
  for (let i = 0; i < contactData[0]['contacts'].length; i++) {
    if (contactData[0]['contacts'][i].id == contactID) {
      contactData[0]['contacts'] = contactData[0]['contacts'].filter(contact => contact.id !== contactID);
      listElementIds.splice(contactID, 1);
      try {
        await clearContact(contactID);
      } catch (error) {
        console.error('Fehler beim Löschen des Kontakts im Backend:', error);
      }
      break;
    }
  }
}

/**
 * Saves the changes made to the current contact.
 * If the window width is less than or equal to 1024 pixels, saves changes in the mobile version of the contact.
 * Clears the content of the current contact container, closes the edit contact popup, resets the current user's data in the backend, and re-renders the UI.
 * @returns {void}
 */
async function saveCurrentContact() {
  if (window.innerWidth <= 1024) {
    saveContactSmallWidth();
  }
  else {
    saveContactBigWidth();
  }
  closeEditContactPopup();
  await resetItem('currentUser', contactData[0]['contacts'])
  render();
}

/**
 * Saves the contact data when the window width is small.
 * Iterates through all contacts and updates their data, then clears the current contact container.
 * @returns {void}
 */
function saveContactSmallWidth() {
  for (let i = 0; i < contactData[0]['contacts'].length; i++) {
    let contactID = currentContactId;

    setVariabelsSmallWidth(i, contactID); // Verwenden Sie den Index direkt
  }
  let currentContactContainerMobile = document.getElementById("currentContactMobile");
  currentContactContainerMobile.innerHTML = "";
  goBackToMobileContactList();
}

/**
 * Sets variables for a contact when the window width is small.
 * @param {number} i - The index of the contact to update.
 * @returns {void}
 */
function setVariabelsSmallWidth(i, contactID) {
  let newFullName = document.getElementById('editContactNameMobile').value;
  let spaceIndex = newFullName.indexOf(" ");
  let newFirstName = newFullName.substring(0, spaceIndex);
  let newName = newFullName.substring(spaceIndex + 1);
  let newEmail = document.getElementById('editContactEmailMobile').value;
  let newPhone = document.getElementById('editContactPhoneMobile').value;
  // Überprüfen Sie, ob der Index innerhalb des gültigen Bereichs liegt
  if (i >= 0 && i < contactData[0]['contacts'].length) {
    // Verwenden Sie i statt contactID für den Zugriff auf das Kontaktobjekt
    contactData[0]['contacts'][contactID].firstname = newFirstName;
        contactData[0]['contacts'][contactID].name = newName;
        contactData[0]['contacts'][contactID].email = newEmail;
        contactData[0]['contacts'][contactID].phoneNumber = newPhone;
  }
}

/**
 * Saves the contact data when the window width is big.
 * Iterates through all contacts and updates their data, then clears the current contact container.
 * @returns {void}
 */
function saveContactBigWidth() {
  for (let i = 0; i < contactData[0]['contacts'].length; i++) {
    let contactID = currentContactId;
    setVariabelsBigWidth(i, contactID); // Passen Sie den Index als Parameter an
  }
  let currentContactContainer = document.getElementById("current-contact");
  currentContactContainer.innerHTML = "";
}

/**
 * Sets variables for a contact when the window width is big.
 * @param {number} i - The index of the contact to update.
 * @param {number} contactID - The ID of the contact to update.
 * @returns {void}
 */
function setVariabelsBigWidth(i, contactID) {
  let newFullName = document.getElementById('editContactName').value;
  let spaceIndex = newFullName.indexOf(" ");
  let newFirstName = newFullName.substring(0, spaceIndex);
  let newName = newFullName.substring(spaceIndex + 1);
  let newEmail = document.getElementById('editContactEmail').value;
  let newPhone = document.getElementById('editContactPhone').value;
  // Überprüfen Sie, ob der Index innerhalb des gültigen Bereichs liegt
  if (i >= 0 && i < contactData[0]['contacts'].length) {
    // Verwenden Sie i statt contactID für den Zugriff auf das Kontaktobjekt
    contactData[0]['contacts'][contactID].firstname = newFirstName;
        contactData[0]['contacts'][contactID].name = newName;
        contactData[0]['contacts'][contactID].email = newEmail;
        contactData[0]['contacts'][contactID].phoneNumber = newPhone;
  }
}

/**
 * Displays a popup indicating that a contact has been successfully created.
 * Shows the popup for 2 seconds and then hides it.
 * @returns {void}
 */
function contactSuccesfullyCreatedPopUp() {
  if (window.innerWidth >= 1024) {
    showPopupBigWidth();
  } else {
    showPopupSmallWidth();
  }
}

/**
 * Displays the success popup when the window width is big.
 * @returns {void}
 */
function showPopupBigWidth() {
  let succesfullyCreatedPopUp = document.getElementById('contactSuccesfullyCreatedPopUp');
    setTimeout(() => {
     succesfullyCreatedPopUp.classList.add('d-none');
    }, 2000);
    succesfullyCreatedPopUp.classList.remove('d-none');
    succesfullyCreatedPopUp.classList.remove('slideOut');
    succesfullyCreatedPopUp.classList.add('slideIn');
}

/**
 * Displays the success popup when the window width is small.
 * @returns {void}
 */
function showPopupSmallWidth() {
  let succesfullyCreatedPopUpMobile = document.getElementById('contactSuccesfullyCreatedPopUpMobile');
    setTimeout(() => {
     succesfullyCreatedPopUpMobile.classList.add('d-none');
    }, 2000);
    succesfullyCreatedPopUpMobile.classList.remove('d-none');
    succesfullyCreatedPopUpMobile.classList.remove('slideOut');
    succesfullyCreatedPopUpMobile.classList.add('slideInMobile');
}

/**
 * Adds event listeners to the current contact and add contact buttons to change their images on mouse enter and mouse leave events.
 * Changes the image source to the hover version when the mouse enters the button, and back to the normal version when the mouse leaves.
 * @returns {void}
 */
document.getElementById('currentContactButton').addEventListener('mouseenter', function() {
  this.src = '../img/mobileMenuCurrentContactHover.svg'; // Pfad zur Hover-Version der SVG
});

document.getElementById('currentContactButton').addEventListener('mouseleave', function() {
  this.src = '../img/mobileMenuCurrentContact.svg'; // Pfad zur normalen Version der SVG
});

document.getElementById('addContactButton').addEventListener('mouseenter', function() {
  this.src = '../img/person_add_hover.svg'; // Pfad zur Hover-Version der SVG
});

document.getElementById('addContactButton').addEventListener('mouseleave', function() {
  this.src = '../img/person_add.svg'; // Pfad zur normalen Version der SVG
});

/**
 * Opens the contact options menu
 * @returns {void}
 */
function openContactOptions() {
  document.getElementById('contactOptions').classList.remove('d-none');
  document.getElementById('backgroundContactOptions').classList.remove('d-none');
}

/**
 * Closes the contact options menu
 * @returns {void}
 */
function closeContactOptions() {
  document.getElementById('backgroundContactOptions').classList.add('d-none');
  document.getElementById('contactOptions').classList.add('d-none');
}

/**
 * Navigates back to the mobile contact list
 * @returns {void}
 */
function goBackToMobileContactList(){
  document.getElementById('mobileAddContactButton').classList.remove('d-none');
  document.getElementById('mobileContactList').classList.remove('d-none');
  document.getElementById('mobileContactList').classList.add('mobileContactList');
  document.getElementById('contactHeaderMobile').classList.add('d-none');
  document.getElementById('currentContactMobile').classList.add('d-none');
  document.getElementById('contactOptions').classList.add('d-none');
  document.getElementById('editCurrentContactButton').classList.add('d-none');
  document.getElementById('backgroundContactOptions').classList.add('d-none');  
  }

/**
 * Displays the desktop contact list
 * @returns {void}
 */
function showDesktopContactList() {
  mobileContactList.classList.remove("mobileContactList");
  mobileContactList.classList.add("d-none");
  mobileContactList.classList.remove("mobileContactList");
  mobileContactList.classList.add("d-none");
  contactHeaderMobile.classList.remove('d-none');
  mobileAddContactButton.classList.add('d-none');
  editCurrentContactButton.classList.remove('d-none');
  currentContactMobile.classList.remove('d-none');
}