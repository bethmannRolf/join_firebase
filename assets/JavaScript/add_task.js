let DROP_DOWN_OPEN = false;
let currentSubtasks = 0;

/**
 * @function initializePriorityButton
 * Initializes the priority button by selecting the medium priority button.
 */
function initializePriorityButton() {
    let mediumButton = document.getElementById('medium-button');
    let mediumImage = document.getElementById('medium-image');
    selectPriorityButton(mediumButton, mediumImage, 1);
}

/**
 * @function initInputDateAddTask
 * Initializes the input field for adding a task with today's date set as the minimum value.
 * @returns {void}
 */
function initInputDateAddTask() {
    setTodaysDateForInputField('due-date-input');
}

/**
 * Adds initials based on the first letter of the 'name' field to each contact object in the provided contactData array.
 * Modifies the 'ini_name' property of each contact object.
 * @function addNameInitialToContacts
 * @param {Array} contactData - The array containing contact objects.
 * @returns {void}
 */
function addNameInitialToContacts(contactData) {
    for (let i = 0; i < contactData[0].contacts.length; i++) {
        let name = contactData[0].contacts[i].name;
        let initials = name.substring(0, 1).toUpperCase();
        contactData[0].contacts[i].ini_name = initials;
    }
}

/**
 * Adds initials based on the first letter of the 'firstname' field to each contact object in the provided contactData array.
 * Modifies the 'ini_first' property of each contact object.
 * @function addInitialsOfFirstNames
 * @param {Array} contactData - The array containing contact objects.
 * @returns {void}
 */
function addInitialsOfFirstNames(contactData) {
    for (let i = 0; i < contactData[0].contacts.length; i++) {
        let first = contactData[0].contacts[i].firstname;
        let inits = first.substring(0, 1).toUpperCase();
        contactData[0].contacts[i].ini_first = inits;
    }
}

/**
 * Renders the dropdown content for assigning contacts based on the contactData array.
 * Clears the existing dropdown content and populates it with new content generated from the contactData array.
 * @function renderDropDown
 * @returns {void}
 */
function renderDropDown() {
    document.getElementById('drop-down-content').innerHTML = '';
    for (let i = 0; i < contactData[0].contacts.length; i++) {
        let singleContact = contactData[0].contacts[i];
        let ini_name = singleContact.name.substring(0, 1).toUpperCase();
        let ini_firstname = singleContact.firstname.substring(0, 1).toUpperCase();
        document.getElementById('drop-down-content').innerHTML += addTaskRenderDropDown(i, singleContact.avatarColor, ini_firstname, ini_name, singleContact.firstname, singleContact.name)
    }
}

document.getElementById('add-task-title-input').addEventListener('input', checkRequiredFields);
document.getElementById('due-date-input').addEventListener('input', checkRequiredFields);
document.getElementById('task-category-select').addEventListener('change', checkRequiredFields);
document.addEventListener('DOMContentLoaded', function () {
    checkRequiredFields();
});


function checkRequiredFields() {
    let titleInput = document.getElementById('add-task-title-input');
    let dueDateInput = document.getElementById('due-date-input');
    let categorySelect = document.getElementById('task-category-select');
    let createTaskButton = document.getElementById('create-task-button');
    if (titleInput.checkValidity() && titleInput.value.trim() !== '' &&
        dueDateInput.checkValidity() && dueDateInput.value.trim() !== '' &&
        categorySelect.checkValidity() && categorySelect.value.trim() !== 'Select Task Category') {
        createTaskButton.removeAttribute('disabled');
    }
    else {
        createTaskButton.setAttribute('disabled', 'true');
    }
}

/**
 * Checks if all required fields for creating a task are valid and not empty.
 * If all required fields are valid and filled, enables the create task button; otherwise, disables it.
 * @function checkRequiredFields
 * @returns {void}
 */
function filterContacts() {
    addNameInitialToContacts(contactData);
    addInitialsOfFirstNames(contactData);
    let search = document.getElementById('assign-search-input').value;
    search = search.toLowerCase();
    let searchedContactContainer = document.getElementById('drop-down-content');
    searchedContactContainer.innerHTML = '';
    for (let i = 0; i < contactData[0].contacts.length; i++) {
        let searchedContact = contactData[0].contacts[i];
        if (searchedContact['firstname'].toLowerCase().includes(search) || searchedContact['name'].toLowerCase().includes(search)) {
            searchedContactContainer.innerHTML += filterContactsAddTaskTemplate(i, searchedContact.avatarColor, searchedContact.ini_first, searchedContact.ini_name, searchedContact.firstname, searchedContact.name)
        }
    }
}

/**
 * @function toggleDropDown
 * Toggles the visibility of the drop-down menu.
 */
function toggleDropDown() {
    if (!DROP_DOWN_OPEN) {
        openDropDown();
        checkSavedContacts()
    } else {
        closeDropDown();
        renderChosenContacts()
    }
}

/**
 * @function redirectToBoardAfterCreating
 * Redirects the user to the board page after creating a task.
 */
function redirectToBoardAfterCreating() {
    window.open("board.html", "_self");
  }


let selectedContacts = [];

/**
 * @function toggleCheckbox
 * Toggles the selection status of a contact checkbox.
 * @param {number} index - The index of the contact.
 */
function toggleCheckbox(index) {
    let contact = contactData[0].contacts[index];
    let contactId = contact.id;
    let checkbox = document.getElementById(`checkbox-${index}`);
    if (checkbox.checked) {
        selectedContacts.push(contact);
    } else {
        let indexToRemove = selectedContacts.findIndex((c) => c.id === contactId);
        if (indexToRemove !== -1) {
            selectedContacts.splice(indexToRemove, 1);
        }
    }
}

/**
 * @function checkSavedContacts
 * Checks and marks checkboxes for previously selected contacts.
 */
function checkSavedContacts() {
    selectedContacts.forEach(contact => {
        let contactId = contact.id;
        let checkbox = document.querySelector(`input[data-contact-id="${contactId}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }
    });
}

/**
 * @function renderChosenContacts
 * Renders selected contacts to the chosen contacts container.
 */
function renderChosenContacts() {
    addNameInitialToContacts(contactData);
    addInitialsOfFirstNames(contactData);
    let chosenContactsContainer = document.getElementById('assigned-contacts-after-choosing');
    chosenContactsContainer.innerHTML = '';
    let maxNormalRender = 4;
    let remainingContacts = selectedContacts.slice(maxNormalRender);
    for (let i = 0; i < Math.min(selectedContacts.length, maxNormalRender); i++) {
        let contact = selectedContacts[i];
        let contactHTML = renderChosenContactsHTMLTemplate(i, contact.avatarColor, contact.ini_first, contact.ini_name);
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
 * Opens the drop-down menu by updating its HTML content, rendering the drop-down items, and focusing on the input field.
 * @function openDropDown
 * @returns {void}
 */
function openDropDown() {
    document.getElementById('assigned-dropdown-div').innerHTML = '';
    document.getElementById('assigned-dropdown-div').innerHTML = addTaskToggleDropDownOpen();
    renderDropDown();
    DROP_DOWN_OPEN = true;
    document.getElementById('drop-down-content').classList.remove('d-none');
    focusInputField();
}

/**
 * Closes the dropdown by resetting its content and hiding it.
 * @function closeDropDown
 * @returns {void}
 */
function closeDropDown() {
    document.getElementById('assigned-dropdown-div').innerHTML = '';
    document.getElementById('assigned-dropdown-div').innerHTML = addTaskToggleDropDownClose();
    document.getElementById('drop-down-content').classList.add('d-none');
    DROP_DOWN_OPEN = false;
}

/**
 * Focuses on the input field for task assignment search and selects its content.
 * @function focusInputField
 * @returns {void}
 */
function focusInputField() {
    let inputField = document.getElementById('assign-search-input');
    inputField.focus();
    inputField.select()
}

/**
 * Focuses on the due date input field.
 * @function focusDueDate
 * @returns {void}
 */
function focusDueDate() {
    let dateInput = document.getElementById('div-dateformchange')
    dateInput.focus();
    dateInput.focus();
}

let selectedPriorityIndex = null;
let prioButtons = document.querySelectorAll('.priority-button');

prioButtons.forEach(function (button, index) {
    button.addEventListener('click', function () {
        handlePriorityButtonClick(button, index);
    });
});

/**
 * Handles the click event on a priority button.
 * @function handlePriorityButtonClick
 * @param {HTMLElement} button - The button element that was clicked.
 * @param {number} index - The index associated with the button.
 * @returns {void}
 */
function handlePriorityButtonClick(button, index) {
    let image = button.querySelector('img');
    let selectedButton = document.querySelector('.selected');
    if (selectedButton && selectedButton !== button) {
        deselectPriorityButton(selectedButton);
    }
    if (button.classList.contains('selected')) {
        deselectPriorityButton(button);
    } else {
        selectPriorityButton(button, image, index);
    }
}

/**
 * Deselects a priority button.
 * @function deselectPriorityButton
 * @param {HTMLElement} button - The button element to deselect.
 * @returns {void}
 */
function deselectPriorityButton(button) {
    button.classList.remove('selected');
    button.style.backgroundColor = '';
    let selectedImage = button.querySelector('img');
    resetImage(selectedImage, button.id);
    selectedPriorityIndex = null;
}

/**
 * Selects a priority button.
 * @function selectPriorityButton
 * @param {HTMLElement} button - The button element to select.
 * @param {HTMLElement} image - The image element within the button.
 * @param {number} index - The index of the selected priority.
 * @returns {void}
 */
function selectPriorityButton(button, image, index) {
    toggleImages(image, button.id);
    button.style.backgroundColor = getBackgroundColor(index);
    button.classList.add('selected');
    selectedPriorityIndex = index;
}

/**
 * Toggles the image source based on the button ID.
 * @function toggleImages
 * @param {HTMLElement} image - The image element to toggle.
 * @param {string} buttonId - The ID of the button associated with the image.
 * @returns {void}
 */
function toggleImages(image, buttonId) {
    switch (buttonId) {
        case 'urgent-button':
            image.src = image.src.includes('urgent-red.svg') ? '../img/add_task/urgent.svg' : '../img/add_task/urgent-red.svg';
            break;
        case 'medium-button':
            image.src = image.src.includes('equity_yellow.svg') ? '../img/add_task/equity_white.svg' : '../img/add_task/equity_yellow.svg';
            break;
        case 'low-button':
            image.src = image.src.includes('low-green.svg') ? '../img/add_task/low.svg' : '../img/add_task/low-green.svg';
            break;
    }
}

/**
 * Returns the background color based on the provided index.
 * @function getBackgroundColor
 * @param {number} index - The index used to determine the background color.
 * @returns {string} - The corresponding background color.
 */
function getBackgroundColor(index) {
    switch (index) {
        case 0:
            return '#FF3D00';
        case 1:
            return '#FFA800';
        case 2:
            return '#7AE229';
        default:
            return '';
    }
}

/**
 * Resets the image source based on the button ID.
 * @function resetImage
 * @param {HTMLImageElement} image - The image element to reset.
 * @param {string} buttonId - The ID of the button associated with the image.
 * @returns {void}
 */
function resetImage(image, buttonId) {
    switch (buttonId) {
        case 'urgent-button':
            image.src = '../img/add_task/urgent-red.svg';
            break;
        case 'medium-button':
            image.src = '../img/add_task/equity_yellow.svg';
            break;
        case 'low-button':
            image.src = '../img/add_task/low-green.svg';
            break;
    }
}

/**
 * Handles form submission event.
 * @function handleFormSubmit
 * @param {Event} event - The submit event object.
 * @returns {void}
 */
function handleFormSubmit(event) {
    if (event.submitter && event.submitter.id === 'create-task-button') {
        addTask();
        deleteLastTask();
    } else {
        event.preventDefault();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let form = document.getElementById('add-task-form');
    form.addEventListener('submit', handleFormSubmit);
    let prioButtons = document.querySelectorAll('.priority-button');
    prioButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            handleFormSubmit(event);
        });
    });
});

/**
 * Adds a new task by gathering the required data, updating task priorities,
 * creating and saving the new task, showing a success message, and clearing the form.
 * @function addTask
 * @returns {void}
 */
function addTask() {
    let newTaskData = gatherNewTaskData();
    createAndSaveNewTask(newTaskData);
    showSuccessMessage();
    clearFormAndDisableButton();
    selectedContacts = []
    renderChosenContacts();
    setTimeout(redirectToBoardAfterCreating, 1000);
}

/**
 * Gathers data for a new task from the form inputs.
 * @function gatherNewTaskData
 * @returns {Object} - An object containing the data for the new task.
 */
function gatherNewTaskData() {
    let newTitle = document.getElementById("add-task-title-input").value;
    let newDescription = document.getElementById("add-task-description-textarea").value;
    let subtasks = getSubtasks();
    let dueDateInput = getAddTaskDueDate();
    let selectedCategory = document.getElementById("task-category-select").value;
    let selectedContactIds = getSelectedContactIds();
    let assigned_contacts = selectedContactIds.map(id => contactData[0].contacts[id]);
    let maxTaskID = Math.max(...contactData[0].tasks[0].toDo.map(task => task.taskID), 0);
    return {
        title: newTitle,
        description: newDescription,
        subtasks: subtasks,
        dueDate: dueDateInput,
        category: selectedCategory,
        assigned_contacts: assigned_contacts,
        prio: selectedPriorityIndex,
        taskID: maxTaskID + 1
    };
}

/**
 * @function getSubtasks
 * Retrieves the subtasks from the DOM and returns them as an array of objects.
 * @returns {Array} Array of subtasks.
 */
function getSubtasks() {
    let subtasks = [];
    let createdSubtasks = document.getElementById('created-subtasks').children;
    for (let i = 0; i < createdSubtasks.length; i++) {
        let subtaskElement = createdSubtasks[i];
        let subtaskId = subtaskElement.id;
        let subtaskText = subtaskElement.querySelector('span').textContent;
        let subtask = {
            id: subtaskId,
            title: subtaskText,
            status: "notDone",
            description: subtaskText
        };
        subtasks.push(subtask);
    }
    return subtasks;
}

/**
 * Retrieves the due date for adding a new task from the input field and validates it against the current date.
 * @function getAddTaskDueDate
 * @returns {string|null} The due date value if it is valid and greater than the current date; otherwise, null.
 */
function getAddTaskDueDate() {
    return document.getElementById('due-date-input').value;
}

/**
 * @function setTodaysDateForInputField
 * Sets today's date as the minimum value for the specified date input field.
 * @param {string} dateInputID - The ID of the date input field.
 */
function setTodaysDateForInputField(dateInputID) {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById(dateInputID).setAttribute('min', today);
}

/**
 * Creates a new task using the provided data and saves it to the to-do list.
 * @function createAndSaveNewTask
 * @param {Object} newTaskData - The data for the new task.
 * @returns {void} - This function does not return a value.
 */
async function createAndSaveNewTask(newTaskData) {
    contactData[0].tasks[0].toDo.push(newTaskData);
    await saveUserTasksToServer();
}

/**
 * Shows a success message by displaying a button for a short duration.
 * @function showSuccessMessage
 * @returns {void} - This function does not return a value.
 */
function showSuccessMessage() {
    let successButton = document.getElementById('success-button');
    successButton.classList.add('visible');
    setTimeout(() => {
        successButton.classList.remove('visible');
    }, 3000);
}

/**
 * Clears the form inputs and disables the create task button.
 * @function clearFormAndDisableButton
 * @returns {void} - This function does not return a value.
 */
function clearFormAndDisableButton() {
    clearForm();
    disableCreateTaskButton();
}

/**
 * Retrieves the IDs of selected contacts from the drop-down content.
 * @function getSelectedContactIds
 * @returns {Array<number>} - An array of selected contact IDs.
 */
function getSelectedContactIds() {
    let checkboxes = document.querySelectorAll('#drop-down-content input[type="checkbox"]');
    let selectedIds = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => parseInt(checkbox.getAttribute('data-contact-id')));
    return selectedIds;
}

/**
 * Deletes the last task from the toDo list of the first task in contactData.
 * @function deleteLastTask
 * @returns {void} - This function does not return a value.
 */
function deleteLastTask() {
    if (contactData[0].tasks[0]['toDo'].length > 0) {
        contactData[0].tasks[0]['toDo'].pop();
    }
}

let originalSubtaskTextMap = {};

/**
 * @function deleteCurrentCreatedSubtask
 * Deletes the subtask element with the specified ID from the DOM.
 * @param {string} createdSubtaskID - The ID of the subtask element to delete.
 */
function deleteCurrentCreatedSubtask(createdSubtaskID) {
    let subtaskElement = document.getElementById(createdSubtaskID);
    if (subtaskElement) {
        subtaskElement.remove();
    }
}

/**
 * @function addNewSubtask
 * Adds a new subtask to the list of created subtasks in the DOM.
 */
function addNewSubtask() {
    let newSubtaskInput = document.getElementById('subtask-input-field').value.trim();
    if (newSubtaskInput !== '') {
        let createdSubtaskID = `subtask-${currentSubtasks}`
        document.getElementById('created-subtasks').innerHTML += addNewSubtaskHTMLTemplate(createdSubtaskID, newSubtaskInput)
        document.getElementById('subtask-input-field').value = ''
        currentSubtasks++;
    }
}

/**
 * @function editCurrentAddTaskSubtask
 * Allows editing of a subtask by replacing its content with an editable input field.
 * @param {string} createdSubtaskID - The ID of the subtask element to be edited.
 */
function editCurrentAddTaskSubtask(createdSubtaskID) {
    let subtaskElement = document.getElementById(createdSubtaskID);
    if (subtaskElement) {
        let subtaskText = subtaskElement.querySelector('span').textContent;
        originalSubtaskTextMap[createdSubtaskID] = subtaskText;
        let newSubtaskElement = editCurrentAddTaskSubtaskHTMLTemplate(createdSubtaskID, subtaskText)
        subtaskElement.outerHTML = newSubtaskElement;
    }
}

/**
 * @function saveEditedSubtask
 * Saves the edited subtask by updating its content with the edited text.
 * @param {string} createdSubtaskID - The ID of the subtask element being edited.
 */
function saveEditedSubtask(createdSubtaskID) {
    let editedSubtaskElement = document.getElementById(createdSubtaskID);
    let editedSubtaskText = editedSubtaskElement.querySelector('input').value;
    let savedSubtaskElement = saveEditedSubtaskHTMLTemplate(createdSubtaskID, editedSubtaskText);
    editedSubtaskElement.outerHTML = savedSubtaskElement;
}

/**
 * @function cancelCurrentEditingSubtask
 * Cancels the current editing of a subtask by restoring its original content.
 * @param {string} createdSubtaskID - The ID of the subtask element being edited.
 */
function cancelCurrentEditingSubtask(createdSubtaskID) {
    let editedSubtaskElement = document.getElementById(createdSubtaskID);
    if (editedSubtaskElement && originalSubtaskTextMap.hasOwnProperty(createdSubtaskID)) {
        let originalSubtaskText = originalSubtaskTextMap[createdSubtaskID];
        let originalSubtaskElement = cancelCurrentEditingSubtaskHTMLTemplate(createdSubtaskID, originalSubtaskText)
        editedSubtaskElement.outerHTML = originalSubtaskElement;
        delete originalSubtaskTextMap[createdSubtaskID];
    }
}

/**
 * @function clearForm
 * Clears the form by resetting various form elements and disabling the create task button.
 * @returns {void}
 */
function clearForm() {
    clearFormValues();
    clearDropDownContent();
    clearPriorityButtons();
    resetTaskCategory();
    clearSubtaskInputs();
    resetDropDownState();
    disableCreateTaskButton();
}

/**
 * Clears the input values of the task form.
 * @function clearFormValues
 * @returns {void} - This function does not return a value.
 */
function clearFormValues() {
    document.getElementById('add-task-title-input').value = '';
    document.getElementById('add-task-description-textarea').value = '';
    document.getElementById('due-date-input').value = '';
    document.getElementById('subtask-input-field').value = '';
}

/**
 * Clears the content of the assigned dropdown and the dropdown content.
 * @function clearDropDownContent
 * @returns {void} - This function does not return a value.
 */
function clearDropDownContent() {
    document.getElementById('assigned-dropdown-div').innerHTML = clearFormTemplate();
    document.getElementById('drop-down-content').innerHTML = '';
}

/**
 * Clears the selected state and styles of all priority buttons.
 * @function clearPriorityButtons
 * @returns {void} - This function does not return a value.
 */
function clearPriorityButtons() {
    document.querySelectorAll('.priority-button').forEach(button => {
        button.classList.remove('selected');
        button.style.backgroundColor = '';
        let image = button.querySelector('img');
        resetImage(image, button.id);
    });
}

/**
 * Resets the task category dropdown selection to the default option.
 * @function resetTaskCategory
 * @returns {void} - This function does not return a value.
 */
function resetTaskCategory() {
    document.getElementById('task-category-select').selectedIndex = 0;
}

/**
 * Clears all created subtasks from the task creation form.
 * @function clearSubtaskInputs
 * @returns {void} - This function does not return a value.
 */
function clearSubtaskInputs() {
    document.getElementById('created-subtasks').innerHTML = '';
}

/**
 * Resets the drop-down state to closed.
 * @function resetDropDownState
 * @returns {void} - This function does not return a value.
 */
function resetDropDownState() {
    DROP_DOWN_OPEN = false;
}

/**
 * Disables the create task button.
 * @function disableCreateTaskButton
 * @returns {void} - This function does not return a value.
 */
function disableCreateTaskButton() {
    let createTaskButton = document.getElementById("create-task-button");
    createTaskButton.disabled = true;
}

/**
 * Closes the dropdown if clicked outside when it is open.
 * This function checks if the dropdown is open and then closes it.
 * After closing, it renders the selected contacts.
 * @function closeDDIfClickedOutside
 * @returns {void}
 */
function closeDDIfClickedOutside() {
    if (DROP_DOWN_OPEN == true) {
        closeDropDown();
        renderChosenContacts()
    }
}

document.getElementById('clear-button').addEventListener('click', clearForm);
document.getElementById("subtask-input-field").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addNewSubtask();
    }
});

document.addEventListener('click', function (event) {
    let assignedToDiv = document.getElementById('assigned-to-div');
    let assignedDropdownDiv = document.getElementById('assigned-dropdown-div');
    let dropDownContent = document.getElementById('drop-down-content');
    let targetElement = event.target;
});
document.getElementById('assigned-dropdown-div').addEventListener('click', function (event) {
    event.stopPropagation();
});

document.addEventListener('click', function (event) {
    let assignedToDiv = document.getElementById('assigned-to-div');
    let dropDownContent = document.getElementById('drop-down-content');
    if (event.target !== assignedToDiv && !assignedToDiv.contains(event.target)) {
        if (event.target !== dropDownContent && !dropDownContent.contains(event.target)) {
            closeDDIfClickedOutside();
        }
    }
});