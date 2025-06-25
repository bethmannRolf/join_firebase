let allTasks = [];

/**
 * Adds initials of the last name to contacts in the contact data.
 * This function extracts the first character of the last name for each contact
 * in the contact data and adds it as `ini_name` property to the contact object.
 * @function addNameInitialToContacts
 * @param {Array} contactData - An array containing contact data.
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
 * Adds initials of the first name to contacts in the contact data.
 * This function extracts the first character of the first name for each contact
 * in the contact data and adds it as `ini_first` property to the contact object.
 * @function addInitialsOfFirstNames
 * @param {Array} contactData - An array containing contact data.
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
 * Retrieves the current priority level.
 * This function retrieves the current priority level based on the `currentOverlayPrio` value.
 * @function getCurrentPriority
 * @returns {number} - The current priority level (0, 1, 2, or 5).
 */
function getCurrentPriority() {
    if (currentOverlayPrio == 0) {
        return 0;
    } else if (currentOverlayPrio == 1) {
        return 1;
    } else if (currentOverlayPrio == 2) {
        return 2;
    } else {
        return 5;
    }
}

/**
 * Sets the urgent overlay status.
 * This function sets the urgent overlay status by updating specific elements on the board overlay.
 * @function addUrgentOverlayStatus
 * @returns {void}
 */
function addUrgentOverlayStatus() {
    document.getElementById('urgent-board-overlay-image').src = '../img/board/urgent.svg'
    document.getElementById('urgent-add-board-overlay-span').classList.add('font-white')
    currentOverlayPrio = 0;
}

/**
 * Removes the urgent overlay status.
 * This function removes the urgent overlay status by updating specific elements on the board overlay.
 * @function removeUrgentOverlayStatus
 * @returns {void}
 */
function removeUrgentOverlayStatus() {
    document.getElementById('urgent-board-overlay-image').src = '../img/board/urgent-red.svg'
    document.getElementById('urgent-add-board-overlay-span').classList.remove('font-white')
}

/**
 * Sets the medium overlay status.
 * This function sets the medium overlay status by updating specific elements on the board overlay.
 * @function addMediumOverlayStatus
 * @returns {void}
 */
function addMediumOverlayStatus() {
    document.getElementById('medium-board-overlay-image').src = '../img/board/equity_white.svg'
    document.getElementById('medium-add-board-overlay-span').classList.add('font-white')
    currentOverlayPrio = 1;
}

/**
 * Removes the medium overlay status.
 * This function removes the medium overlay status by updating specific elements on the board overlay.
 * @function removeMediumOverlayStatus
 * @returns {void}
 */
function removeMediumOverlayStatus() {
    document.getElementById('medium-board-overlay-image').src = '../img/board/equity_yellow.svg'
    document.getElementById('medium-add-board-overlay-span').classList.remove('font-white')
}

/**
 * Sets the low overlay status.
 * This function sets the low overlay status by updating specific elements on the board overlay.
 * @function addLowOverlayStatus
 * @returns {void}
 */
function addLowOverlayStatus() {
    document.getElementById('low-board-overlay-image').src = '../img/board/low.svg'
    document.getElementById('low-add-board-overlay-span').classList.add('font-white')
    currentOverlayPrio = 2;
}

/**
 * Removes the low overlay status.
 * This function removes the low overlay status by updating specific elements on the board overlay.
 * @function removeLowOverlayStatus
 * @returns {void}
 */
function removeLowOverlayStatus() {
    document.getElementById('low-board-overlay-image').src = '../img/board/low-green.svg'
    document.getElementById('low-add-board-overlay-span').classList.remove('font-white')
}

/**
 * Focuses on and selects the search input field on the board overlay.
 * This function sets focus on the search input field and selects its content.
 * @function focusboardOverlaySearchInputField
 * @returns {void}
 */
function focusboardOverlaySearchInputField() {
    let inputField = document.getElementById('assign-search-board-overlay-input');
    inputField.focus();
    inputField.select();
}

/**
 * Retrieves the IDs of selected contacts from checkboxes in the board overlay.
 * This function retrieves the IDs of selected contacts by querying checkboxes and extracting IDs from checked ones.
 * @function getSelectedContactIds
 * @returns {Array<number>} An array containing the IDs of selected contacts.
 */
function getSelectedContactIds() {
    let checkboxes = document.querySelectorAll('#drop-down-board-overlay-content input[type="checkbox"]');
    let selectedIds = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => parseInt(checkbox.getAttribute('data-contact-id')));
    return selectedIds;
}

/**
 * Toggles the visibility of the board overlay drop-down.
 * This function toggles the visibility of the board overlay drop-down based on its current state.
 * @function toggleBoardOverlayDropDown
 * @returns {void}
 */
function toggleBoardOverlayDropDown() {
    if (DROP_DOWN_ADD_BORD_VIEW == false) {
        toggleDDBoardTaskCloseOpen()
        checkSavedContacts()
    }
    else {
        toggleDDBoardTaskClose()
        renderChosenContacts()
    }
}

let selectedContactsBoardOverlay = [];

/**
 * Toggles the checkbox in the board overlay view for selecting contacts.
 * This function adds or removes contacts from the selectedContactsBoardOverlay array based on checkbox state.
 * @function toggleCheckboxBoardOverlay
 * @param {number} index - The index of the contact.
 */
function toggleCheckboxBoardOverlay(index) {
    let contact = contactData[0].contacts[index];
    let contactId = contact.id;
    let checkbox = document.getElementById(`checkbox-${index}`);
    if (checkbox.checked) {
        selectedContactsBoardOverlay.push(contact);
    } else {
        let indexToRemove = selectedContactsBoardOverlay.findIndex((c) => c.id === contactId);
        if (indexToRemove !== -1) {
            selectedContactsBoardOverlay.splice(indexToRemove, 1);
        }
    }
}

/**
 * Checks the saved contacts in the board overlay view.
 * This function checks the checkboxes for contacts that are already selected and saved.
 * @function checkSavedContacts
 */
function checkSavedContacts() {
    selectedContactsBoardOverlay.forEach(contact => {
        let contactId = contact.id;
        let checkbox = document.querySelector(`input[data-contact-id="${contactId}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }
    });
}

/**
 * Renders the chosen contacts in the board overlay view.
 * This function renders the selected contacts in the board overlay view, including their initials and avatar color.
 * @function renderChosenContacts
 */
function renderChosenContacts() {
    addNameInitialToContacts(contactData);
    addInitialsOfFirstNames(contactData);
    let chosenContactsContainer = document.getElementById('assigned-contacts-after-choosing-board-overlay');
    chosenContactsContainer.innerHTML = '';
    let maxNormalRender = 4;
    let remainingContacts = selectedContactsBoardOverlay.slice(maxNormalRender);
    for (let i = 0; i < Math.min(selectedContactsBoardOverlay.length, maxNormalRender); i++) {
        let contact = selectedContactsBoardOverlay[i];
        let contactHTML = renderChosenContactsBoardOverlayHTMLTemplate(i, contact.avatarColor, contact.ini_first, contact.ini_name);
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
 * Sets focus on and selects the search input field in the board overlay.
 * This function sets focus on the search input field and selects its content in the board overlay.
 * @function focusAssignSearchInputField
 * @returns {void}
 */
function focusAssignSearchInputField() {
    let inputField = document.getElementById('assign-search-board-overlay-input');
    inputField.focus();
    inputField.select()
}

/**
 * Renders the board overlay drop-down content with contacts.
 * This function populates the board overlay drop-down with contacts' information.
 * @function renderBoardOverlayDropDown
 * @returns {void}
 */
function renderBoardOverlayDropDown() {
    addInitialsOfFirstNames(contactData)
    addNameInitialToContacts(contactData)
    document.getElementById('drop-down-board-overlay-content').innerHTML = '';
    for (let i = 0; i < contactData[0].contacts.length; i++) {
        let singleContact = contactData[0].contacts[i];
        document.getElementById('drop-down-board-overlay-content').innerHTML += boardAddTaskContactsTemplate(i, singleContact.avatarColor, singleContact.ini_first, singleContact.ini_name, singleContact.firstname, singleContact.name, singleContact.id);
    }
}

/**
 * Toggles the board overlay task dropdown to open state.
 * This function toggles the board overlay task dropdown to open state by rendering the open template,
 * populating it with contacts, and focusing on the search input field.
 * @function toggleDDBoardTaskCloseOpen
 * @returns {void}
 */
function toggleDDBoardTaskCloseOpen() {
    document.getElementById('assigned-dropdown-board-overlay-div').innerHTML = '';
    document.getElementById('assigned-dropdown-board-overlay-div').innerHTML = openDDOverlayBoardTaskTemplate();
    renderBoardOverlayDropDown()
    DROP_DOWN_ADD_BORD_VIEW = true;
    document.getElementById('drop-down-board-overlay-content').classList.remove('d-none');
    // focusboardOverlaySearchInputField();
}

/**
 * Toggles the board overlay task dropdown to closed state.
 * This function toggles the board overlay task dropdown to closed state by rendering the closed template
 * and hiding the dropdown content.
 * @function toggleDDBoardTaskClose
 * @returns {void}
 */
function toggleDDBoardTaskClose() {
    document.getElementById('assigned-dropdown-board-overlay-div').innerHTML = '';
    document.getElementById('assigned-dropdown-board-overlay-div').innerHTML = closeDDOverlayBoardTaskTemplate();
    document.getElementById('drop-down-board-overlay-content').classList.add('d-none');
    DROP_DOWN_ADD_BORD_VIEW = false;
}

/**
 * Filters and renders board overlay contacts based on search input.
 * This function filters contacts based on the search input and renders the filtered contacts in the board overlay.
 * @function filterBoardOverlayContacts
 * @returns {void}
 */
function filterBoardOverlayContacts() {
    addNameInitialToContacts(contactData);
    addInitialsOfFirstNames(contactData);
    let search = document.getElementById('assign-search-board-overlay-input').value;
    search = search.toLowerCase();
    let searchedContactContainer = document.getElementById('drop-down-board-overlay-content');
    searchedContactContainer.innerHTML = '';
    for (let i = 0; i < contactData[0].contacts.length; i++) {
        let searchedContact = contactData[0].contacts[i];
        if (searchedContact['firstname'].toLowerCase().includes(search) || searchedContact['name'].toLowerCase().includes(search)) {
            searchedContactContainer.innerHTML += filterBoardAddTaskContactsTemplate(i, searchedContact.avatarColor, searchedContact.ini_first, searchedContact.ini_name, searchedContact.firstname, searchedContact.name);
        }
    }
}

/**
 * Generates a new unique task ID.
 * This function generates a new unique task ID by iterating through existing tasks and finding the maximum ID,
 * then incrementing it to create a new ID for a new task.
 * @function generateTaskID
 * @returns {number} - The new unique task ID.
 */
function generateTaskID() {
    contactData[0].tasks.forEach(category => {
        Object.values(category).forEach(tasks => {
            allTasks.push(...tasks);
        });
    });
    let maxID = 0;
    allTasks.forEach(task => {
        if (task && typeof task === 'object' && 'taskID' in task) {
            if (task.taskID > maxID) {
                maxID = task.taskID;
            }
        }
    });
    return maxID + 1;
}

let currentSubtasksBoardOverlay = 0;
let originalSubtaskTextMapBoardOverlay = {};

/**
 * Adds a new subtask in the board overlay view.
 * This function adds a new subtask to the list of subtasks in the board overlay view.
 * @function addNewOverlaySubtask
 */
function addNewOverlaySubtask() {
    let newSubtaskInput = document.getElementById('subtask-input-board-overlay-field').value.trim();
    if (newSubtaskInput !== '') {
        let createdSubtaskID = `subtask-${currentSubtasksBoardOverlay}`
        document.getElementById('created-board-overlay-subtasks').innerHTML += addNewOverlaySubtaskHTMLTemplate(createdSubtaskID, newSubtaskInput)
        document.getElementById('subtask-input-board-overlay-field').value = ''
        currentSubtasksBoardOverlay++;
    }
}

/**
 * @function editCurrentAddTaskSubtaskBoardOverlay
 * Edits the current subtask in the board overlay view.
 * This function allows the user to edit the text of the current subtask in the board overlay view.
 * @param {string} createdSubtaskID - The ID of the subtask to be edited.
 */
function editCurrentAddTaskSubtaskBoardOverlay(createdSubtaskID) {
    let subtaskElement = document.getElementById(createdSubtaskID);
    if (subtaskElement) {
        let subtaskText = subtaskElement.querySelector('span').textContent;
        originalSubtaskTextMapBoardOverlay[createdSubtaskID] = subtaskText;
        let newSubtaskElement = editCurrentAddTaskSubtaskBoardOverlayHTMLTemplate(createdSubtaskID, subtaskText)
        subtaskElement.outerHTML = newSubtaskElement;
    }
}

/**
 * @function deleteCurrentCreatedSubtaskBoardOverlay
 * Deletes the current created subtask in the board overlay view.
 * This function removes the HTML element representing the current subtask in the board overlay view.
 * @param {string} createdSubtaskID - The ID of the subtask to be deleted.
 */
function deleteCurrentCreatedSubtaskBoardOverlay(createdSubtaskID) {
    let subtaskElement = document.getElementById(createdSubtaskID);
    if (subtaskElement) {
        subtaskElement.remove();
    }
}

/**
 * @function saveEditedSubtaskBoardOverlay
 * Saves the edited subtask in the board overlay view.
 * This function updates the HTML element representing the edited subtask in the board overlay view.
 * @param {string} createdSubtaskID - The ID of the subtask being edited.
 */
function saveEditedSubtaskBoardOverlay(createdSubtaskID) {
    let editedSubtaskElement = document.getElementById(createdSubtaskID);
    let editedSubtaskText = editedSubtaskElement.querySelector('input').value;
    let savedSubtaskElement = saveEditedSubtaskBoardOverlayHTMLTemplate(createdSubtaskID, editedSubtaskText)
    editedSubtaskElement.outerHTML = savedSubtaskElement;
}

/**
 * @function cancelCurrentEditingSubtaskBoardOverlay
 * Cancels the editing of a subtask in the board overlay view.
 * This function restores the original subtask text and layout in the board overlay view.
 * @param {string} createdSubtaskID - The ID of the subtask being edited.
 */
function cancelCurrentEditingSubtaskBoardOverlay(createdSubtaskID) {
    let editedSubtaskElement = document.getElementById(createdSubtaskID);
    if (editedSubtaskElement && originalSubtaskTextMap.hasOwnProperty(createdSubtaskID)) {
        let originalSubtaskText = originalSubtaskTextMap[createdSubtaskID];
        let originalSubtaskElement = cancelCurrentEditingSubtaskBoardOverlayHTMLTemplate(createdSubtaskID, originalSubtaskText)
        editedSubtaskElement.outerHTML = originalSubtaskElement;
        delete originalSubtaskTextMap[createdSubtaskID];
    }
}

/**
 * @function getSubtasksBoardOverlay
 * Retrieves the subtasks entered in the board overlay view.
 * @returns {Array} An array containing objects representing the subtasks.
 */
function getSubtasksBoardOverlay() {
    let subtasks = [];
    let createdSubtasks = document.getElementById('created-board-overlay-subtasks').children;
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
 * Changes the close image to a light blue version.
 * This function updates the source of the close image to display a light blue version.
 * @function changeCloseLightblue
 * @returns {void} - This function does not return a value.
 */
function changeCloseLightblue() {
    document.getElementById('cancel-image-add-board').src = '../img/board/close_lightblue.svg';
}

/**
 * Changes the close image to a black version.
 * This function updates the source of the close image to display a black version.
 * @function changeCloseToBlack
 * @returns {void} - This function does not return a value.
 */
function changeCloseToBlack() {
    document.getElementById('cancel-image-add-board').src = '../img/board/close.svg';
}

/**
 * Opens the add task form based on window size.
 * If the window width is less than or equal to 1024 pixels, it redirects to "add_task_n_include.html".
 * Otherwise, it shows an overlay with the add task form.
 * @function openAddTaskForm
 * @returns {void} - This function does not return a value.
 */
function openAddTaskForm() {
    if (window.innerWidth <= 1024) {
        window.open("add_task_n_include.html", "_self");
    } else {
        showOverlay();
        document.getElementById("darkBackgroundContainer").classList.remove("d-none");
        document.getElementById("darkBackgroundContainer").classList.remove("swipeOutBackground");
        document.getElementById('add-task-id-overlay').classList.add('showAddTask');
        let addTaskBody = document.getElementById('add-task-id-overlay');
        addTaskBody.innerHTML = '';
        addTaskBody.innerHTML = boardAddTaskTemplate();
        setTodaysDateForInputField('due-date-board-overlay-input');

    }
}

/**
 * Closes the task view and saves user tasks to the server asynchronously.
 * This function awaits the completion of saving user tasks to the server,
 * then closes the add task view and updates the HTML board.
 * @function closeTaskViewAndSave
 * @returns {Promise<void>} - A Promise that resolves when the tasks are saved and the view is closed.
 */
async function closeTaskViewAndSave() {
    await saveUserTasksToServer();
    closeAddTaskView();
    updateHTMLBoard();
}

/**
 * Displays the overlay on the screen by removing the 'overlay-d-none' class and adding the 'overlay' class.
 * This function shows an overlay element by manipulating its CSS classes.
 * @function showOverlay
 * @returns {void} - This function does not return a value.
 */
function showOverlay() {
    let overlay = document.getElementById('overlay-identifier');
    overlay.classList.remove('overlay-d-none');
    overlay.classList.add('overlay');
}

/**
 * Displays the overlay on the screen by removing the 'overlay-d-none' class and adding the 'overlay' class.
 * This function shows an overlay element by manipulating its CSS classes.
 * @function showOverlay
 * @returns {void} - This function does not return a value.
 */
function hideOverlay() {
    let overlay = document.getElementById('overlay-identifier');
    overlay.classList.remove('overlay');
    overlay.classList.add('overlay-d-none');
}

/**
 * Closes the add task view by updating CSS classes and hiding elements.
 * This function closes the add task view by updating CSS classes and hiding elements.
 * @function closeAddTaskView
 * @returns {void} - This function does not return a value.
 */
function closeAddTaskView() {
    setTimeout(function () {
        document.getElementById("darkBackgroundContainer").classList.add("swipeOutBackground");
        document.getElementById("darkBackgroundContainer").classList.add("d-none");
    }, 300);
    hideOverlay();
    document.getElementById('add-task-id-overlay').classList.remove('showAddTask');
}

/**
 * Validates task inputs to ensure required fields are not empty.
 * This function checks if the title, category, and due date inputs are not empty or whitespace.
 * @function validateTaskInputs
 * @param {string} title - The title of the task.
 * @param {string} category - The category of the task.
 * @param {string} dueDate - The due date of the task.
 * @returns {boolean} - True if all required inputs are non-empty and not whitespace; otherwise, false.
 */
function validateTaskInputs(title, category, dueDate) {
    return (title && title.trim() !== '' && category && category.trim() !== '' && dueDate && dueDate.trim() !== '');
}

/**
 * Adds a new task to the task management system.
 * This function retrieves task details, validates them, and creates a new task if inputs are valid.
 * @function addTask
 * @returns {void} - This function does not return any value.
 */
function addTask() {
    let title = getTitle();
    let category = getCategory();
    let dueDate = getDueDate();
    let description = getDescription();
    let selectedContacts = selectedContactsBoardOverlay
    let currentOverlayPrio = getCurrentPriority();
    let subtasks = getSubtasksBoardOverlay();
    if (validateTaskInputs(title, category, dueDate)) {
        let newTask = createTask(title, description, selectedContacts, category, dueDate, currentOverlayPrio, subtasks);
        addNewTaskToData(newTask);
        closeTaskViewAndSave();
    }
}

/**
 * Adds a task using the board overlay interface.
 * This function calls the addTask function to add a new task.
 * @function addTaskBoardOverlay
 * @returns {void} - This function does not return any value.
 */
function addTaskBoardOverlay() {
    addTask();
}

/**
 * Retrieves the title input value from the add task board overlay.
 * @function getTitle
 * @returns {string} - The value of the title input.
 */
function getTitle() {
    return document.getElementById('add-task-title-board-overlay-input').value;
}

/**
 * Retrieves the description input value from the add task board overlay textarea.
 * @function getDescription
 * @returns {string} - The value of the description input.
 */
function getDescription() {
    return document.getElementById('add-task-description-board-overlay-textarea').value;
}

/**
 * Retrieves the selected category value from the add task board overlay select element.
 * @function getCategory
 * @returns {string} - The selected category value.
 */
function getCategory() {
    return document.getElementById('task-category-board-overlay-select').value;
}

/**
 * Retrieves the due date from the board overlay input field and validates it against the current date.
 * @function getDueDate
 * @returns {string|null} The due date value if it is valid and greater than the current date; otherwise, null.
 */
function getDueDate() {
    return document.getElementById('due-date-board-overlay-input').value;
}

/**
 * Creates a new task object based on provided parameters.
 * @function createTask
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {Array<Object>} selectedContacts - An array of selected contacts assigned to the task.
 * @param {string} category - The category of the task.
 * @param {string} dueDate - The due date of the task.
 * @param {number} currentOverlayPrio - The priority of the task.
 * @param {Array<Object>} subtasks - An array of subtasks associated with the task.
 * @returns {Object} - The created task object.
 */
function createTask(title, description, selectedContacts, category, dueDate, currentOverlayPrio, subtasks) {
    return {
        title: title,
        taskID: generateTaskID(),
        description: description,
        assigned_contacts: selectedContacts,
        category: category,
        dueDate: dueDate,
        prio: currentOverlayPrio,
        subtasks: subtasks
    };
}

/**
 * Adds a new task to the data structure.
 * @function addNewTaskToData
 * @param {Object} newTask - The new task object to add.
 * @returns {void}
 */
function addNewTaskToData(newTask) {
    contactData[0].tasks[0].toDo.push(newTask);
}

/**
 * Opens the detailed view of a task with the specified data.
 * @param {string} taskID - The ID of the task to display.
 * @function openTaskDetail
 * @returns {void}
 */
function openTaskDetail(taskID) {
    let task = findTaskByID(taskID);
    let priorityInfo = taskPriority(task.prio);
    let categoryBackgroundColor = getCategoryBackgroundColor(task.category);
    let formattedDueDate = formatDate(task.dueDate);
    let assignedContactsHTML = generateAssignedContacts(task);
    let subtasksHTML = generateSubtasksHTML(task, taskID);
    showTaskDetailOverlaySlider()
    document.getElementById('detailview-container').innerHTML = '';
    document.getElementById('detailview-container').innerHTML = renderOpenTaskDetailTemplate(categoryBackgroundColor, task.category, task.title, task.description, formattedDueDate, priorityInfo.text, priorityInfo.image, taskID);
    document.getElementById('render-assigned-contacts').innerHTML = assignedContactsHTML;
    document.getElementById('render-taskdetails-subtasks').innerHTML = subtasksHTML;

}

/**
 * Displays the task detail overlay slider and related elements.
 * @function showTaskDetailOverlaySlider
 * @returns {void}
 */
function showTaskDetailOverlaySlider() {
    slideIn();
    showOverlay();
    if (window.innerWidth > 1024) {
        let darkBackgroundContainer = document.getElementById("darkBackgroundContainer");
        darkBackgroundContainer.classList.remove("d-none");
        darkBackgroundContainer.classList.remove("swipeOutBackground");
    }
}