/**
 * Toggles the appearance of a delete image and changes styles on hover.
 * This function adds event listeners to a delete button container to handle hover effects.
 * @function toggleDeleteImageOnHover
 * @returns {void}
 */
function toggleDeleteImageOnHover() {
    let deleteDiv = document.querySelector('.taskdetails-delete-div');
    deleteDiv.addEventListener('mouseover', () => {
        document.getElementById('delete-image').src = "../img/board/delete_light.svg";
        deleteDiv.classList.add('taskdetails-delet-edit-blue');
    });
    deleteDiv.addEventListener('mouseout', () => {
        document.getElementById('delete-image').src = "../img/board/delete.svg";
        deleteDiv.classList.remove('taskdetails-delet-edit-blue');
    });
}

/**
 * Toggles the visibility of a dropdown menu and triggers corresponding actions.
 * This function toggles the visibility of a dropdown menu and calls specific functions based on its current state.
 * @function toggleDropDown
 * @returns {void}
 */
function toggleDropDownEdit() {
    if (DROP_DOWN_BOARD_OPEN == false) {
        toggleDDBoardEditOpen()
        checkSavedContactsEdit()
    }
    else {
        toggleDDBoardEditClose();
        renderChosenContactsEdit()
    }
}

let selectedContactsEdit = [];

/**
 * Toggles the selection of a contact when the checkbox is clicked in edit mode.
 * This function updates the `selectedContactsEdit` array by either adding or removing the selected contact based on the checkbox state.
 * @function toggleCheckboxEdit
 * @param {number} index - The index of the contact in the contactData array.
 * @returns {void}
 */
function toggleCheckboxEdit(index) {
    let contact = contactData[0].contacts[index];
    let contactId = contact.id;
    let checkbox = document.getElementById(`checkbox-${index}`);
    if (checkbox.checked) {
        selectedContactsEdit.push(contact);
    } else {
        let indexToRemove = selectedContactsEdit.findIndex((c) => c.id === contactId);
        if (indexToRemove !== -1) {
            selectedContactsEdit.splice(indexToRemove, 1);
        }
    }
}

/**
 * Checks the saved contacts in edit mode and sets their checkboxes to checked.
 * This function iterates through the `selectedContactsEdit` array and sets the corresponding checkboxes to checked based on the contact IDs.
 * @function checkSavedContactsEdit
 * @returns {void}
 */
function checkSavedContactsEdit() {
    selectedContactsEdit.forEach(contact => {
        let contactId = contact.id;
        let checkbox = document.querySelector(`input[data-contact-id="${contactId}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }
    });
}

/**
 * Renders the chosen contacts for editing.
 * This function updates the UI to display the currently selected contacts for editing.
 * It limits the display to a maximum of 4 contacts and shows a "+X" element for any additional contacts.
 * @function renderChosenContactsEdit
 * @returns {void}
 */
function renderChosenContactsEdit() {
    addNameInitialToContacts(contactData);
    addInitialsOfFirstNames(contactData);
    let chosenContactsContainer = document.getElementById('current-assigned-contacts');
    chosenContactsContainer.innerHTML = '';
    let maxNormalRender = 4;
    let remainingContacts = selectedContactsEdit.slice(maxNormalRender);
    for (let i = 0; i < Math.min(selectedContactsEdit.length, maxNormalRender); i++) {
        let contact = selectedContactsEdit[i];
        let contactHTML = renderChosenContactsEditHTMLTemplate(i, contact.avatarColor, contact.ini_first, contact.ini_name);
        let contactElement = document.createElement('div');
        contactElement.innerHTML = contactHTML;
        chosenContactsContainer.appendChild(contactElement);
    }
    if (remainingContacts.length > 0) {
        let remainingCount = remainingContacts.length;
        let plusXElement = document.createElement('div');
        plusXElement.textContent = `+${remainingCount}`;
        plusXElement.style.alignContent = 'center';
        plusXElement.style.paddingLeft = '4px';
        chosenContactsContainer.appendChild(plusXElement);
    }
}

/**
 * Renders a dropdown menu with contact data.
 * This function populates a dropdown menu with contact information based on the provided data.
 * @function renderDropDown
 * @param {Array<Object>} contactData - An array of objects containing contact information.
 * @returns {void}
 */
function renderDropDown() {
    addInitialsOfFirstNames(contactData)
    addNameInitialToContacts(contactData)
    document.getElementById('drop-down-edit-content').innerHTML = '';
    for (let i = 0; i < contactData[0].contacts.length; i++) {
        let singleContact = contactData[0].contacts[i];
        document.getElementById('drop-down-edit-content').innerHTML += renderDropDownEditTemplate(i, singleContact.avatarColor, singleContact.ini_first, singleContact.ini_name, singleContact.firstname, singleContact.name);
    }
}

/**
 * Focuses and selects the text in an input field for assigning searches.
 * This function focuses on the input field specified by ID and selects its text.
 * @function focusAssignSearchInputField
 * @returns {void}
 */
function focusAssignSearchInputField() {
    let inputField = document.getElementById('assign-search-board-edit-input');
    inputField.focus();
    inputField.select()
}

/**
 * Toggles and opens the dropdown board for editing.
 * This function clears and replaces the content of the dropdown board with an open template,
 * renders the dropdown menu, updates the state variable, displays the dropdown content,
 * and focuses on the search input field.
 * @function toggleDDBoardEditOpen
 * @returns {void}
 */
function toggleDDBoardEditOpen() {
    document.getElementById('assigned-dropdown-div').innerHTML = '';
    document.getElementById('assigned-dropdown-div').innerHTML = openDropDownBoardTemplate();
    renderDropDown()
    DROP_DOWN_BOARD_OPEN = true;
    document.getElementById('drop-down-edit-content').classList.remove('d-none');
    focusAssignSearchInputField()
}

/**
 * Toggles and closes the dropdown board for editing.
 * This function clears and replaces the content of the dropdown board with a closed template,
 * hides the dropdown content, and updates the state variable to indicate that the dropdown board is closed.
 * @function toggleDDBoardEditClose
 * @returns {void}
 */
function toggleDDBoardEditClose() {
    document.getElementById('assigned-dropdown-div').innerHTML = '';
    document.getElementById('assigned-dropdown-div').innerHTML = closeDropDownBoardTemplate()
    document.getElementById('drop-down-edit-content').classList.add('d-none')
    DROP_DOWN_BOARD_OPEN = false;
}

/**
 * Filters and displays contacts in the dropdown edit content based on a search input.
 * This function filters the contacts based on the search input value, updates the displayed contacts in the dropdown edit content,
 * and renders the filtered contacts using a template.
 * @function filterEditContacts
 * @returns {void}
 */
function filterEditContacts() {
    addNameInitialToContacts(contactData);
    addInitialsOfFirstNames(contactData);
    let search = document.getElementById('assign-search-board-edit-input').value;
    search = search.toLowerCase();
    let searchedContactContainer = document.getElementById('drop-down-edit-content');
    searchedContactContainer.innerHTML = '';
    for (let i = 0; i < contactData[0].contacts.length; i++) {
        let searchedContact = contactData[0].contacts[i];
        if (searchedContact['firstname'].toLowerCase().includes(search) || searchedContact['name'].toLowerCase().includes(search)) {
            searchedContactContainer.innerHTML += filterContactsEditTemplate(i, searchedContact.avatarColor, searchedContact.ini_first, searchedContact.ini_name, searchedContact.firstname, searchedContact.name);
        }
    }
}

/**
 * Sets focus to the input field for adding/editing subtasks.
 * This function sets focus to the input field specified by its ID ("edit-subtask-input").
 * @function focusSubtaskInput
 * @returns {void}
 */
function focusSubtaskInput() {
    document.getElementById("edit-subtask-input").focus();
}

/**
 * Sets focus to the input field for editing the due date of a task.
 * This function sets focus to the input field specified by its ID ("taskdetail-date-input").
 * @function focusEditDueDate
 * @returns {void}
 */
function focusEditDueDate() {
    document.getElementById('taskdetail-date-input').focus();
}

/**
 * Deletes a specific subtask from a task and triggers callback functions.
 * This function removes a subtask identified by its ID from a task specified by its ID,
 * saves the updated tasks to the server, updates the HTML board display,
 * and optionally invokes a callback function with the task ID.
 * @function deleteCurrentSubtask
 * @param {string} taskID - The ID of the task containing the subtask to delete.
 * @param {string} subtaskID - The ID of the subtask to delete.
 * @param {function} [callback] - An optional callback function to invoke after deleting the subtask.
 * @returns {void}
 */
function deleteCurrentSubtask(taskID, subtaskID, callback) {
    let task = findTaskByID(taskID);
    let subtaskIndex = task.subtasks.findIndex(subtask => subtask.id === subtaskID);
    if (subtaskIndex !== -1) {
        task.subtasks.splice(subtaskIndex, 1);
        saveUserTasksToServer();
        updateHTMLBoard()
        if (callback) {
            callback(taskID);
        }
    }
}

/**
 * Adds a new subtask to a task if conditions are met.
 * This function adds a new subtask to the specified task if the task has less than 2 subtasks,
 * the input field for the subtask description is not empty, and the description is trimmed.
 * The new subtask is created with a generated ID and default status and description.
 * After adding the subtask, the user tasks are saved to the server and the HTML board display is updated.
 * @function addSubtaskToTask
 * @param {Object} task - The task object to which the new subtask will be added.
 * @returns {void}
 */
function addSubtaskToTask(task) {
    if (task.subtasks.length < 500) {
        let newSubtaskDescription = document.getElementById('edit-subtask-input').value;
        if (newSubtaskDescription.trim() !== '') {
            let newSubtask = {
                id: generateSubtaskID(task),
                title: newSubtaskDescription,
                status: "notDone",
                description: newSubtaskDescription
            };
            task.subtasks.push(newSubtask);
            saveUserTasksToServer()
            updateHTMLBoard()
        }
    }
}

/**
 * Renders the edit view for a specific task.
 * This function renders the edit view for a task identified by its ID by calling the `editTask` function.
 * @function renderEditTaskView
 * @param {string} taskID - The ID of the task to render the edit view for.
 * @returns {void}
 */
function renderEditTaskView(taskID) {
    editTask(taskID);
}

/**
 * Generates a unique ID for a new subtask within a task.
 * This function generates a unique ID for a new subtask based on the number of existing subtasks in the task.
 * If the task object and its subtasks array are provided and valid, the ID for the new subtask will be one more than the current number of subtasks.
 * @function generateSubtaskID
 * @param {Object} task - The task object for which the subtask ID is being generated.
 * @returns {number|undefined} - The generated subtask ID (a number), or undefined if task or task.subtasks is invalid.
 */
function generateSubtaskID(task) {
    if (task && task.subtasks) {
        return task.subtasks.length + 1;
    }
}

/**
 * Handles the process of adding a subtask to a task and then editing the task.
 * This function retrieves a task by its ID, adds a new subtask to the task,
 * and then proceeds to edit the task by calling the `editTask` function.
 * @function editAddSubtask
 * @param {string} transfertaskID - The ID of the task to which the subtask will be added.
 * @returns {void}
 */
function editAddSubtask(transfertaskID) {
    let taskID = transfertaskID;
    let task = findTaskByID(taskID);
    addSubtaskToTask(task);
    editTask(taskID)
}

/**
 * Retrieves the ID of the current subtask being edited.
 * This function extracts the ID of the current subtask being edited from the DOM.
 * It assumes that the subtask ID is embedded in the parent node's ID attribute,
 * where the ID format is 'listelement-subtaskID{id}'.
 * @function getCurrentSubtaskID
 * @returns {number|null} - The ID of the current subtask as a number, or null if extraction fails.
 */
function getCurrentSubtaskID() {
    let subtaskIDString = document.querySelector('.subtaskinput-edit').parentNode.id.replace('listelement-subtaskID', '');
    return parseInt(subtaskIDString);
}

/**
 * Displays images associated with a specific subtask.
 * This function shows images associated with a subtask by unhiding the corresponding element
 * identified by the constructed ID (`hover-box-edit${subtaskId}`).
 * If the element with the constructed ID exists in the DOM, its 'd-none' class is removed
 * to make the images visible.
 * @function showImages
 * @param {number} subtaskId - The ID of the subtask associated with the images to display.
 * @returns {void}
 */
function showImages(subtaskId) {
    let elementId = `hover-box-edit${subtaskId}`;
    let element = document.getElementById(elementId);
    if (element) {
        element.classList.remove("d-none");
    }
}

/**
 * Hides images associated with a specific subtask.
 * This function hides images associated with a subtask by adding the 'd-none' class
 * to the corresponding element identified by the constructed ID (`hover-box-edit${subtaskId}`).
 * If the element with the constructed ID exists in the DOM, its 'd-none' class is added
 * to hide the images.
 * @function hideImages
 * @param {number} subtaskId - The ID of the subtask associated with the images to hide.
 * @returns {void}
 */
function hideImages(subtaskId) {
    let elementId = `hover-box-edit${subtaskId}`;
    let element = document.getElementById(elementId);
    if (element) {
        element.classList.add("d-none");
    }
}

/**
 * Confirms the editing of the current subtask's description and updates the task.
 * This function retrieves the new subtask description from the input field,
 * updates the description of the corresponding subtask within the specified task,
 * and then closes the current subtask edit view.
 * @function confirmCurrentSubtaskEdit
 * @param {string} currentSupTaskID - The ID of the task containing the current subtask being edited.
 * @returns {void}
 */
function confirmCurrentSubtaskEdit(currentSupTaskID) {
    let subtaskInput = document.querySelector('.subtaskinput-edit');
    let newSubtaskDescription = subtaskInput.value;
    let task = findTaskByID(currentSupTaskID);
    let subtaskID = getCurrentSubtaskID();
    if (task && task.subtasks) {
        let subtaskToUpdate = task.subtasks.find(subtask => subtask.id === subtaskID);
        if (subtaskToUpdate) {
            subtaskToUpdate.description = newSubtaskDescription;
        }
    }
    closeCurrentSubtaskEdit(currentSupTaskID);
}

/**
 * Closes the current subtask edit view and updates the displayed subtasks.
 * This function retrieves the task by its ID, generates HTML for the subtask list,
 * and updates the corresponding HTML element ('edit-subtask-list') with the updated subtasks HTML.
 * @function closeCurrentSubtaskEdit
 * @param {string} currentSupTaskID - The ID of the task for which the subtask edit view is being closed.
 * @returns {void}
 */
function closeCurrentSubtaskEdit(currentSupTaskID) {
    let task = findTaskByID(currentSupTaskID);
    let subtasksHTML = '';
    if (task.subtasks && task.subtasks.length > 0) {
        for (let i = 0; i < task.subtasks.length; i++) {
            let subtask = task.subtasks[i];
            subtasksHTML += closeSubtaskEditTemplate(subtask.id, subtask.description, task.taskID);
        }
    }
    document.getElementById('edit-subtask-list').innerHTML = subtasksHTML;
}

/**
 * Updates the displayed subtask description in the task edit view.
 * This function updates the HTML content of a specific subtask element (`listelement-subtaskID${subtaskId}`)
 * with the edited subtask description using the provided template.
 * @function editsubtasks
 * @param {number} subtaskId - The ID of the subtask to update.
 * @param {string} currentDescription - The current description of the subtask.
 * @param {string} currentSupTaskID - The ID of the task containing the subtask.
 * @returns {void}
 */
function editsubtasks(subtaskId, currentDescription, currentSupTaskID) {
    let subtaskDescription = currentDescription;
    let currentSubListElement = document.getElementById(`listelement-subtaskID${subtaskId}`)
    currentSubListElement.innerHTML = editSubtaskTemplate(subtaskDescription, currentSupTaskID, currentSupTaskID);
}

/**
 * Adds an urgent status indicator to the task edit view.
 * This function updates the urgent status image (`edit-urgent-image`) and applies
 * a CSS class (`font-white`) to the corresponding span element (`edit-urgent-span`).
 * Additionally, it sets the current priority (`currentPrio`) to 0, indicating urgent status.
 * @function addUrgentStatus
 * @returns {void}
 */
function addUrgentStatus() {
    document.getElementById('edit-urgent-image').src = '../img/board/urgent.svg';
    document.getElementById('edit-urgent-span').classList.add('font-white')
    currentPrio = 0
}

/**
 * Adds a medium priority status indicator to the task edit view.
 * This function updates the medium priority status image (`edit-medium-image`) and applies
 * a CSS class (`font-white`) to the corresponding span element (`edit-medium-span`).
 * Additionally, it sets the current priority (`currentPrio`) to 1, indicating medium priority.
 * @function addMediumStatus
 * @returns {void}
 */
function addMediumStatus() {
    document.getElementById('edit-medium-image').src = '../img/board/equity_white.svg';
    document.getElementById('edit-medium-span').classList.add('font-white')
    currentPrio = 1
}

/**
 * Adds a low priority status indicator to the task edit view.
 * This function updates the low priority status image (`edit-low-image`) and applies
 * a CSS class (`font-white`) to the corresponding span element (`edit-low-span`).
 * Additionally, it sets the current priority (`currentPrio`) to 2, indicating low priority.
 * @function addLowStatus
 * @returns {void}
 */
function addLowStatus() {
    document.getElementById('edit-low-image').src = '../img/board/low.svg';
    document.getElementById('edit-low-span').classList.add('font-white')
    currentPrio = 2;
}

/**
 * Removes the urgent status indicator from the task edit view.
 * This function updates the urgent status image (`edit-urgent-image`) to indicate a non-urgent status
 * and removes the CSS class (`font-white`) from the corresponding span element (`edit-urgent-span`).
 * @function removeUrgentStatus
 * @returns {void}
 */
function removeUrgentStatus() {
    document.getElementById('edit-urgent-image').src = '../img/board/urgent-red.svg';
    document.getElementById('edit-urgent-span').classList.remove('font-white')
}

/**
 * Removes the medium priority status indicator from the task edit view.
 * This function updates the medium priority status image (`edit-medium-image`) to indicate a non-medium priority status
 * and removes the CSS class (`font-white`) from the corresponding span element (`edit-medium-span`).
 * @function removeMediumStatus
 * @returns {void}
 */
function removeMediumStatus() {
    document.getElementById('edit-medium-image').src = '../img/board/equity_yellow.svg';
    document.getElementById('edit-medium-span').classList.remove('font-white')
}

/**
 * Removes the low priority status indicator from the task edit view.
 * This function updates the low priority status image (`edit-low-image`) to indicate a non-low priority status
 * and removes the CSS class (`font-white`) from the corresponding span element (`edit-low-span`).
 * @function removeLowStatus
 * @returns {void}
 */
function removeLowStatus() {
    document.getElementById('edit-low-image').src = '../img/board/low-green.svg';
    document.getElementById('edit-low-span').classList.remove('font-white')
}

/**
 * Saves edited changes to a task and updates its details.
 * This function retrieves the edited values from various input fields in the task edit view,
 * validates the due date, updates the task details accordingly, and closes the edit task view.
 * @function saveEditedChanges
 * @param {string} taskID - The ID of the task being edited.
 * @returns {boolean} - Returns false to prevent default form submission.
 */
function saveEditedChanges(taskID) {
    let title = document.getElementById('edit-title-value-input').value;
    let description = document.getElementById('edit-textarea-input').value;
    let dueDate = document.getElementById('taskdetail-date-input').value;
    let parsedDueDate = new Date(dueDate);
    task = findTaskByID(taskID);
    let selectedContactIDs = getSelectedContactIDsEdit();
    task.assigned_contacts = filterContacts(selectedContactIDs);
    if (isValidDueDate(parsedDueDate)) {
        updateTaskDetails(task, title, description, dueDate);
        closeEditTaskAndSave();
    }
    return false;
}

/**
 * Closes the task edit view and saves changes to the server.
 * This function triggers the saving of user tasks to the server, slides out the edit task view,
 * and updates the HTML board to reflect the changes.
 * @function closeEditTaskAndSave
 * @returns {void}
 */
function closeEditTaskAndSave() {
    saveUserTasksToServer();
    slideOut();
    updateHTMLBoard();
}

/**
 * Filters contact objects based on selected contact IDs.
 * This function filters the contact objects from the first group of contactData
 * based on the provided array of selected contact IDs.
 * @function filterContacts
 * @param {Array<string>} selectedContactIDs - An array of selected contact IDs.
 * @returns {Array<Object>} - An array containing filtered contact objects.
 */
function filterContacts(selectedContactIDs) {
    return contactData[0].contacts.filter(contact => selectedContactIDs.includes(contact.id));
}

/**
 * Checks if a parsed due date is valid.
 * This function checks if the parsed due date is a valid Date object by verifying
 * that its time value is not NaN.
 * @function isValidDueDate
 * @param {Date} parsedDueDate - The parsed due date as a Date object.
 * @returns {boolean} - Returns true if the due date is valid, otherwise false.
 */
function isValidDueDate(parsedDueDate) {
    return !isNaN(parsedDueDate.getTime());
}

/**
 * Updates task details with new title, description, due date, and priority.
 * This function updates the specified task object with the provided title, description,
 * due date, and priority (if `currentPrio` is defined).
 * @function updateTaskDetails
 * @param {Object} task - The task object to update.
 * @param {string} title - The new title for the task.
 * @param {string} description - The new description for the task.
 * @param {string} dueDate - The new due date for the task (in string format).
 * @returns {void}
 */
function updateTaskDetails(task, title, description, dueDate) {
    task.description = description;
    task.title = title;
    task.dueDate = dueDate;
    task.prio = (currentPrio !== undefined) ? currentPrio : 1;
}

/**
 * Retrieves IDs of selected contacts from checkboxes in the dropdown edit content.
 * This function retrieves the IDs of selected contacts by querying checkboxes
 * within the dropdown edit content area and collecting IDs of checked checkboxes.
 * @function getSelectedContactIDsEdit
 * @returns {Array<number>} - An array of IDs representing selected contacts.
 */
function getSelectedContactIDsEdit() {
    let selectedContactIDs = [];
    let checkboxes = document.querySelectorAll('#drop-down-edit-content input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedContactIDs.push(parseInt(checkbox.getAttribute('data-contact-id')));
        }
    });
    return selectedContactIDs;
}

/**
 * Toggles the edit image on hover for a task details edit div.
 * This function adds event listeners to a task details edit div (`editDiv`) for mouseover and mouseout events.
 * When the mouse is over the edit div, it updates the source of the edit image (`edit-image`) to a light version.
 * Additionally, it adds a CSS class (`taskdetails-delet-edit-blue`) to highlight the edit div.
 * When the mouse moves out of the edit div, it resets the source of the edit image back to the default version
 * and removes the highlighting CSS class.
 * @function toggleEditImageOnHover
 * @returns {void}
 */
function toggleEditImageOnHover() {
    let editDiv = document.querySelector('.taskdetails-edit-div');
    editDiv.addEventListener('mouseover', () => {
        document.getElementById('edit-image').src = "../img/board/edit_light.svg";
        editDiv.classList.add('taskdetails-delet-edit-blue');
    });
    editDiv.addEventListener('mouseout', () => {
        document.getElementById('edit-image').src = "../img/board/edit.svg";
        editDiv.classList.remove('taskdetails-delet-edit-blue');
    });
}

/**
 * Formats a due date string into a specific date format for editing.
 * This function takes a due date string and formats it into a 'DD/MM/YYYY' date format.
 * @function formatEditDate
 * @param {string} dueDate - The due date string to format (e.g., 'YYYY-MM-DD').
 * @returns {string} - The formatted date string in 'DD/MM/YYYY' format.
 */
function formatEditDate(dueDate) {
    let dateObject = new Date(dueDate);
    let day = String(dateObject.getDate()).padStart(2, '0');
    let month = String(dateObject.getMonth() + 1).padStart(2, '0');
    let year = dateObject.getFullYear();
    let formattedEditDate = `${day}/${month}/${year}`;
    return formattedEditDate;
}

/**
 * Toggles the status (done/not done) of a subtask for a specified task.
 * This function toggles the status of a subtask (identified by its index) for a specified task
 * based on the state of a checkbox input.
 * @function toggleSubtaskStatus
 * @param {string} taskID - The ID of the task containing the subtask.
 * @param {number} subtaskIndex - The index of the subtask within the task's subtasks array.
 * @param {HTMLInputElement} checkbox - The checkbox input element used to toggle the subtask status.
 * @returns {void}
 */
function toggleSubtaskStatus(taskID, subtaskIndex, checkbox) {
    let task = findTaskByID(taskID);
    if (subtaskIndex >= 0 && subtaskIndex < task.subtasks.length) {
        let subtask = task.subtasks[subtaskIndex];
        subtask.status = checkbox.checked ? 'done' : 'notDone';
        saveUserTasksToServer()
        updateHTMLBoard();
    }
}

/**
 * Retrieves the initials of a contact.
 * This function generates initials for a contact based on the first characters of the first name and last name.
 * @function getInitials
 * @param {Object} contact - The contact object containing 'firstname' and 'name' properties.
 * @returns {string} - The initials derived from the contact's first name and last name.
 */
function getInitials(contact) {
    return contact.firstname.charAt(0).toUpperCase() + contact.name.charAt(0).toUpperCase();
}

/**
 * Prepares the task details view for editing based on the specified task ID.
 * This function retrieves the task details using the given task ID and updates
 * the task details view with editable components such as assigned contacts and subtasks.
 * @function editTask
 * @param {string} taskID - The ID of the task to be edited.
 * @returns {void}
 */
function editTask(taskID) {
    let task = findTaskByID(taskID);
    // let currentAssignedContactsHTML = generateCurrentAssignedContactsHTML(task);
    let subtasksHTML = generateSubtasksHTMLEditable(task, taskID);
    let formattedDueDate = formatDate(task.dueDate);
    updateDetailViewContainer(task, formattedDueDate, taskID);
    selectedContactsEdit = task.assigned_contacts;
    renderChosenContactsEdit()
    // updateAssignedContacts(currentAssignedContactsHTML);
    updateSubtaskList(subtasksHTML);
    setTodaysDateForInputField('taskdetail-date-input');
}

/**
 * Generates HTML content for currently assigned contacts of a task.
 * This function generates HTML content representing the currently assigned contacts
 * of a specified task, using contact data from the application.
 * @function generateCurrentAssignedContactsHTML
 * @param {Object} task - The task object containing assigned_contacts property.
 * @returns {string} - The HTML content representing assigned contacts.
 */
function generateCurrentAssignedContactsHTML(task) {
    let currentAssignedContactsHTML = '';
    if (task.assigned_contacts == undefined) {
        currentAssignedContactsHTML = '';
    } else {
        for (let j = 0; j < task.assigned_contacts.length; j++) {
            let userFirstName = task.assigned_contacts[j].firstname;
            let userLastName = task.assigned_contacts[j].name;
            if (userFirstName === contactData[0].userFirstName && userLastName === contactData[0].userName) {
                isCurrentUser = true;
            }
            currentAssignedContactsHTML += editAssignedTaskTemplate(task.assigned_contacts[j].avatarColor, task.assigned_contacts[j].firstname.charAt(0), task.assigned_contacts[j].name.charAt(0));
        }
    }
    return currentAssignedContactsHTML;
}

/**
 * Generates HTML content for editable subtasks of a task.
 * This function generates HTML content representing the editable subtasks
 * of a specified task, using subtask data from the task object.
 * @function generateSubtasksHTMLEditable
 * @param {Object} task - The task object containing subtasks property.
 * @param {string} taskID - The ID of the task associated with the subtasks.
 * @returns {string} - The HTML content representing editable subtasks.
 */
function generateSubtasksHTMLEditable(task, taskID) {
    let subtasksHTML = '';
    if (task.subtasks && task.subtasks.length > 0) {
        for (let i = 0; i < task.subtasks.length; i++) {
            let subtask = task.subtasks[i];
            subtasksHTML += editTaskSubtaskTemplate(subtask.id, subtask.description, taskID);
        }
    }
    return subtasksHTML;
}

/**
 * Updates the detail view container with editable task content.
 * This function updates the HTML content of the detail view container with
 * editable task information such as title, description, due date, and task ID.
 * @function updateDetailViewContainer
 * @param {Object} task - The task object containing title and description properties.
 * @param {string} formattedDueDate - The formatted due date string for display.
 * @param {string} taskID - The ID of the task associated with the detail view.
 * @returns {void}
 */
function updateDetailViewContainer(task, formattedDueDate, taskID) {
    document.getElementById('detailview-container').innerHTML = renderEditTaskContent(task.title, task.description, formattedDueDate, taskID);
}

/**
 * Updates the current assigned contacts section with new HTML content.
 * This function updates the HTML content of the current assigned contacts section
 * with the provided HTML string representing assigned contacts.
 * @function updateAssignedContacts
 * @param {string} currentAssignedContactsHTML - The HTML content representing assigned contacts.
 * @returns {void}
 */
// function updateAssignedContacts(currentAssignedContactsHTML) {
//     document.getElementById('current-assigned-contacts').innerHTML = currentAssignedContactsHTML;
// }

/**
 * Updates the subtask list with new HTML content.
 * This function updates the HTML content of the subtask list
 * with the provided HTML string representing subtasks.
 * @function updateSubtaskList
 * @param {string} subtasksHTML - The HTML content representing subtasks.
 * @returns {void}
 */
function updateSubtaskList(subtasksHTML) {
    document.getElementById('edit-subtask-list').innerHTML = subtasksHTML;
}

/**
 * Generates HTML content for subtasks of a task.
 * This function generates HTML content representing the subtasks
 * of a specified task, using subtask data from the task object.
 * @function generateSubtasksHTML
 * @param {Object} task - The task object containing subtasks property.
 * @param {string} taskID - The ID of the task associated with the subtasks.
 * @returns {string} - The HTML content representing subtasks.
 */
function generateSubtasksHTML(task, taskID) {
    let subtasksHTML = '';
    task.subtasks.forEach((subtask, index) => {
        let checkboxChecked = isSubtaskDone(subtask);
        subtasksHTML += taskDetailSubtaskTemplate(index, checkboxChecked ? 'checked' : '', taskID, subtask.description);
    });
    return subtasksHTML;
}

/**
 * Checks if a subtask is marked as done.
 * This function checks the status of a subtask object to determine
 * if it is considered as done (completed).
 * @function isSubtaskDone
 * @param {Object} subtask - The subtask object containing a status property.
 * @returns {boolean} - True if the subtask is done, false otherwise.
 */
function isSubtaskDone(subtask) {
    return subtask.status && subtask.status.toLowerCase() === 'done';
}

/**
 * Gets the background color for a specified category.
 * This function returns a predefined background color based on the given category.
 * @function getCategoryBackgroundColor
 * @param {string} category - The category of the task.
 * @returns {string} - The background color corresponding to the category.
 */
function getCategoryBackgroundColor(category) {
    switch (category) {
        case "User Story":
            return "#0038FF";
        case "Technical Task":
            return "#1fd7c1";
        default:
            return "#FFFFFF";
    }
}

/**
 * Generates HTML content for assigned contacts of a task.
 * This function generates HTML content representing the assigned contacts
 * of a specified task, using contact data from the task object.
 * @function generateAssignedContacts
 * @param {Object} task - The task object containing assigned_contacts property.
 * @returns {string} - The HTML content representing assigned contacts.
 */
function generateAssignedContacts(task) {
    let assignedContactsHTML = '';
    if (task.assigned_contacts == undefined) {
        assignedContactsHTML = '';
    } else {
        for (let j = 0; j < task.assigned_contacts.length; j++) {
            let userFirstName = task.assigned_contacts[j].firstname;
            let userLastName = task.assigned_contacts[j].name;
            let isCurrentUser = false;
            if (userFirstName === contactData[0].userFirstName && userLastName === contactData[0].userName) {
                isCurrentUser = true;
            }
            assignedContactsHTML += taskDetailAssignedTemplate(task.assigned_contacts[j].avatarColor, task.assigned_contacts[j].firstname.charAt(0), task.assigned_contacts[j].name.charAt(0), userFirstName, userLastName, isCurrentUser ? " (You)" : "");
        }
    }
    return assignedContactsHTML;
}

/**
 * Deletes a task from the user's task lists.
 * This function deletes a task with the specified taskID from the user's task lists,
 * including 'toDo', 'inProgress', 'awaitFeedback', and 'done' lists.
 * @function deleteTask
 * @param {string} taskID - The ID of the task to delete.
 * @returns {void}
 */
function deleteTask(taskID) {
    let taskLists = ['toDo', 'inProgress', 'awaitFeedback', 'done'];
    for (let status of taskLists) {
        let tasksInStatus = contactData[0].tasks[0][status];
        let indexToDelete = tasksInStatus.findIndex(task => task.taskID == taskID);
        if (indexToDelete !== -1) {
            tasksInStatus.splice(indexToDelete, 1);
            break;
        }
    }
    saveUserTasksToServer()
    slideOut();
    updateHTMLBoard();
}