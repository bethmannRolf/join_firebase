let detailwindow = false;
let DROP_DOWN_BOARD_OPEN = false;
let DROP_DOWN_ADD_BORD_VIEW = false;
let currentPrio;
let currentOverlayPrio;
let currentDraggedElement;
let filteredTasks = {};
let currentFocusedDiv = null;

/**
 * Initializes board-related functions.
 * This function initializes functions related to the game board.
 * @function initBoardFunctions
 */
function initBoardFunctions() {
    updateHTMLBoard();
}

/**
 * Sets today's date as the minimum value for a given input field.
 * @param {string} dateInputID - The ID of the input field to set the date for.
 * @returns {void}
 */
function setTodaysDateForInputField(dateInputID) {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById(dateInputID).setAttribute('min', today);
}


/**
 * Updates the HTML board with task data after a delay.
 * This function updates the HTML board by deselecting any highlighted elements,
 * filtering tasks by category, and rendering various task lists (To-Do, In Progress, Await Feedback, Done).
 * @function updateHTMLBoard
 */
function updateHTMLBoard() {
    setTimeout(function () {
        deselectHighlight()
        filterTasksByCategory()
        renderToDos();
        renderInProgress()
        renderAwaitFeedback()
        renderDone()
    }, 1000);
}

addNameInitialToContacts(contactData);
addInitialsOfFirstNames(contactData);

/**
 * Renders a column on the board with specified tasks.
 * This function renders a column on the board based on the given parameters.
 * It retrieves tasks of a specific type from a filtered list, clears the column element,
 * and then renders the tasks into the column using provided templates.
 * @function renderColumn
 * @param {string} columnId - The ID of the column element where tasks will be rendered.
 * @param {string} taskType - The type of tasks to render (e.g., "To-Do", "In Progress", "Await Feedback", "Done").
 * @param {Array} filteredTasks - An array of tasks to filter and render.
 * @param {string} noTasksTemplate - The HTML template to render when there are no tasks to display.
 * @param {string} renderTemplate - The HTML template used to render each task.
 */
function renderColumn(columnId, taskType, filteredTasks, noTasksTemplate, renderTemplate) {
    let tasks = getTasks(filteredTasks, taskType);
    let columnElement = getColumnElement(columnId);
    clearColumn(columnElement);
    renderTasks(tasks, columnElement, renderTemplate, noTasksTemplate);
}

/**
 * Retrieves tasks of a specified type from a filtered task list.
 * @function getTasks
 * @param {Array|null} filteredTasks - The filtered task list from which to retrieve tasks.
 * @param {string} taskType - The type of tasks to retrieve (e.g., "To-Do", "In Progress", "Await Feedback", "Done").
 * @returns {Array} - An array of tasks of the specified type, or an empty array if no tasks are found.
 */
function getTasks(filteredTasks, taskType) {
    return filteredTasks || contactData[0]?.tasks[0][taskType] || [];
}

/**
 * Retrieves the column element from the DOM based on its ID.
 * @function getColumnElement
 * @param {string} columnId - The ID of the column element to retrieve.
 * @returns {HTMLElement|null} - The column element corresponding to the provided ID, or null if not found.
 */
function getColumnElement(columnId) {
    return document.getElementById(columnId);
}

/**
 * Clears the content of a column element.
 * @function clearColumn
 * @param {HTMLElement} columnElement - The column element to clear.
 */
function clearColumn(columnElement) {
    columnElement.innerHTML = '';
}

/**
 * Renders tasks into a column element using specified templates.
 * @function renderTasks
 * @param {Array} tasks - An array of tasks to render.
 * @param {HTMLElement} columnElement - The column element where tasks will be rendered.
 * @param {Function} renderTemplate - The template function used to render each task.
 * @param {Function} noTasksTemplate - The template function to render when there are no tasks.
 */
function renderTasks(tasks, columnElement, renderTemplate, noTasksTemplate) {
    if (tasks.length > 0) {
        tasks.forEach(task => {
            renderTask(task, columnElement, renderTemplate);
        });
    } else {
        columnElement.innerHTML = noTasksTemplate();
    }
}

/**
 * Renders a task within a specific column element using a render template.
 * Determines how the task should be displayed based on its properties.
 * @function renderTask
 * @param {Object} task - The task object to render.
 * @param {Element} columnElement - The column element where the task should be rendered.
 * @param {Function} renderTemplate - The function used to render the task template.
 * @returns {void}
 */
function renderTask(task, columnElement, renderTemplate) {
    let priorityImagePath = determinePriorityImagePath(task.prio);
    let categoryBackgroundColor = determineCategoryBackgroundColor(task.category);
    let doneSubtasksCount = getDoneSubtasksCount(task);
    let totalSubtasksCount = getTotalSubtasksCount(task);
    let fillWidth = calculateFillWidth(task);
    if (task.assigned_contacts.length > 4) {
        renderTaskWithManyContacts(task, columnElement, renderTemplate, categoryBackgroundColor, priorityImagePath, doneSubtasksCount, totalSubtasksCount, fillWidth);
    } else {
        renderTaskWithNormalContacts(task, columnElement, renderTemplate, categoryBackgroundColor, priorityImagePath, doneSubtasksCount, totalSubtasksCount, fillWidth);
    }
}

/**
 * Renders a task with many assigned contacts within a column element using a render template.
 * Handles the rendering logic based on the number of assigned contacts.
 * @function renderTaskWithManyContacts
 * @param {Object} task - The task object to render.
 * @param {Element} columnElement - The column element where the task should be rendered.
 * @param {Function} renderTemplate - The function used to render the task template.
 * @param {string} categoryBackgroundColor - The background color based on task category.
 * @param {string} priorityImagePath - The image path for task priority.
 * @param {number} doneSubtasksCount - The count of completed subtasks.
 * @param {number} totalSubtasksCount - The total count of subtasks.
 * @param {number} fillWidth - The fill width of the task progress bar.
 * @returns {void}
 */
function renderTaskWithManyContacts(task, columnElement, renderTemplate, categoryBackgroundColor, priorityImagePath, doneSubtasksCount, totalSubtasksCount, fillWidth) {
    let assignedContactsHTML = generateAssignedManyContactsHTML(task.assigned_contacts);
    if (task.subtasks.length >= 1) {
        columnElement.innerHTML += renderTemplate(task.taskID, categoryBackgroundColor, task.category, task.title, task.description, fillWidth, doneSubtasksCount, totalSubtasksCount, assignedContactsHTML, priorityImagePath);
    } else {
        columnElement.innerHTML += renderTemplate(task.taskID, categoryBackgroundColor, task.category, task.title, task.description, fillWidth, doneSubtasksCount, totalSubtasksCount, assignedContactsHTML, priorityImagePath);
        let newSubContainer = document.getElementById(`subtasksDiv${task.taskID}`);
        newSubContainer.innerHTML = '';
    }
    let additionalUsers = task.assigned_contacts.length - 4;
    document.getElementById(`extraUsers${task.taskID}`).innerHTML = addiotionalUsersHTMLTemplate(additionalUsers);
}

/**
 * Renders a task with a normal number of assigned contacts within a column element using a render template.
 * Handles the rendering logic based on the number of assigned contacts.
 * @function renderTaskWithNormalContacts
 * @param {Object} task - The task object to render.
 * @param {Element} columnElement - The column element where the task should be rendered.
 * @param {Function} renderTemplate - The function used to render the task template.
 * @param {string} categoryBackgroundColor - The background color based on task category.
 * @param {string} priorityImagePath - The image path for task priority.
 * @param {number} doneSubtasksCount - The count of completed subtasks.
 * @param {number} totalSubtasksCount - The total count of subtasks.
 * @param {number} fillWidth - The fill width of the task progress bar.
 * @returns {void}
 */
function renderTaskWithNormalContacts(task, columnElement, renderTemplate, categoryBackgroundColor, priorityImagePath, doneSubtasksCount, totalSubtasksCount, fillWidth) {
    let assignedContactsHTML = generateAssignedContactsHTML(task.assigned_contacts);
    if (task.subtasks.length >= 1) {
        columnElement.innerHTML += renderTemplate(task.taskID, categoryBackgroundColor, task.category, task.title, task.description, fillWidth, doneSubtasksCount, totalSubtasksCount, assignedContactsHTML, priorityImagePath);
    } else {
        columnElement.innerHTML += renderTemplate(task.taskID, categoryBackgroundColor, task.category, task.title, task.description, fillWidth, doneSubtasksCount, totalSubtasksCount, assignedContactsHTML, priorityImagePath);
        let newSubContainer = document.getElementById(`subtasksDiv${task.taskID}`);
        newSubContainer.innerHTML = '';
    }
}

/**
 * Extracts initials from a contact's first name and last name.
 * @function extractInitials
 * @param {Object} contact - The contact object from which to extract initials.
 * @returns {Object} - An object containing the first initials of the first name and last name.
 */
function extractInitials(contact) {
    const first = contact.firstname.charAt(0);
    const last = contact.name.charAt(0);
    return { first, last };
}

/**
 * Generates HTML for assigned contacts based on a list of contacts.
 * @function generateAssignedContactsHTML
 * @param {Array} assignedContacts - An array of contact objects representing assigned contacts.
 * @returns {string} - A string containing HTML markup for assigned contacts.
 */
function generateAssignedContactsHTML(assignedContacts) {
    let assignedContactsHTML = '';
    if (assignedContacts == undefined) {
        assignedContactsHTML = '';
    } else {
        assignedContacts.forEach(contact => {
            const { first, last } = extractInitials(contact);
            assignedContactsHTML += renderAssignedTemplate(contact.avatarColor, first, last);
        });
    }
    return assignedContactsHTML;
}

function generateAssignedManyContactsHTML(assignedContacts) {
    let assignedContactsHTML = '';
    if (assignedContacts == undefined) {
        assignedContactsHTML = '';
    } else {
        // Iteriere nur über die ersten 4 Elemente des Arrays oder bis zur Länge des Arrays, falls weniger als 4 Elemente vorhanden sind
        for (let i = 0; i < Math.min(4, assignedContacts.length); i++) {
            const contact = assignedContacts[i];
            const { first, last } = extractInitials(contact);
            assignedContactsHTML += renderAssignedTemplate(contact.avatarColor, first, last);
        }
    }
    return assignedContactsHTML;
}

/**
 * Renders an assigned contact template with specified parameters.
 * @function renderAssignedTemplate
 * @param {string} avatarColor - The avatar color of the assigned contact.
 * @param {string} iniFirst - The first initial of the contact's first name.
 * @param {string} iniName - The first initial of the contact's last name.
 * @returns {string} - A string containing HTML markup for the assigned contact template.
 */
function renderAssignedTemplate(avatarColor, iniFirst, iniName) {
    return renderAssignedToDoTemplate(avatarColor, iniFirst, iniName);
}

/**
 * Determines the image path for a given priority level.
 * @function determinePriorityImagePath
 * @param {number} priority - The priority level of the task.
 * @returns {string} - The image path corresponding to the specified priority level.
 */
function determinePriorityImagePath(priority) {
    switch (priority) {
        case 0:
            return "../img/board/prio_high.svg";
        case 1:
            return "../img/board/prio_equation.svg";
        case 2:
            return "../img/board/prio_low.svg";
        default:
            return "../img/board/prio_equation.svg";
    }
}

/**
 * Determines the background color for a given task category.
 * @function determineCategoryBackgroundColor
 * @param {string} category - The category of the task.
 * @returns {string} - The background color corresponding to the specified task category.
 */
function determineCategoryBackgroundColor(category) {
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
 * Renders To-Do tasks into the To-Do column on the board.
 * @function renderToDos
 * @param {Array} [filteredTasks] - An optional array of tasks to render as To-Do tasks.
 */
function renderToDos(filteredTasks) {
    renderColumn('to-do-column', 'toDo', filteredTasks, noTasksToDoTemplate, renderToDoTemplate);
}

/**
 * Renders In Progress tasks into the In Progress column on the board.
 * @function renderInProgress
 * @param {Array} [filteredTasks] - An optional array of tasks to render as In Progress tasks.
 */
function renderInProgress(filteredTasks) {
    renderColumn('in-progress-column', 'inProgress', filteredTasks, noTasksInProgressTemplate, renderInProgressTemplate);
}

/**
 * Renders tasks awaiting feedback into the Await Feedback column on the board.
 * @function renderAwaitFeedback
 * @param {Array} [filteredTasks] - An optional array of tasks to render as tasks awaiting feedback.
 */
function renderAwaitFeedback(filteredTasks) {
    renderColumn('await-feedback-column', 'awaitFeedback', filteredTasks, noTasksAwaitFeedbackTemplate, renderAwaitFeedbackTemplate);
}

/**
 * Renders completed tasks into the Done column on the board.
 * @function renderDone
 * @param {Array} [filteredTasks] - An optional array of completed tasks to render.
 */
function renderDone(filteredTasks) {
    renderColumn('done-column', 'done', filteredTasks, noTasksDoneTemplate, renderDoneTemplate);
}

/**
 * Filters and refreshes tasks on the board based on user input.
 * @function filterTasksBoard
 */
function filterTasksBoard() {
    let search = document.getElementById('board-input-field').value.toLowerCase();
    if (contactData[0]?.tasks[0]) {
        let filteredTasks = getFilteredTasks(search);
        if (areAllTasksEmpty(filteredTasks)) {
            showToastMessage("No results found. :( ");
        }
        refreshFilteredResults(filteredTasks);
    }
}

/**
 * Filters tasks by category based on user search input.
 * @function getFilteredTasks
 * @param {string} search - The search input provided by the user.
 * @returns {Object} - An object containing filtered tasks grouped by category.
 */
function getFilteredTasks(search) {
    return {
        'toDo': filterTasksByCategory('toDo', search),
        'inProgress': filterTasksByCategory('inProgress', search),
        'awaitFeedback': filterTasksByCategory('awaitFeedback', search),
        'done': filterTasksByCategory('done', search)
    };
}

/**
 * Checks if all task categories are empty in the provided tasks object.
 * @function areAllTasksEmpty
 * @param {Object} tasks - An object containing task arrays grouped by category.
 * @returns {boolean} - True if all task categories are empty, otherwise false.
 */
function areAllTasksEmpty(tasks) {
    return Object.values(tasks).every(tasks => tasks.length === 0);
}

/**
 * Refreshes the board with filtered tasks for each task category.
 * @function refreshFilteredResults
 * @param {Object} filteredTasks - An object containing filtered tasks grouped by category.
 */
function refreshFilteredResults(filteredTasks) {
    renderToDos(filteredTasks.toDo);
    renderInProgress(filteredTasks.inProgress);
    renderAwaitFeedback(filteredTasks.awaitFeedback);
    renderDone(filteredTasks.done);
}

/**
 * Moves a task from 'In Progress' category to 'To Do' category.
 * @function moveFromInProgress
 * @param {string} taskID - The ID of the task to move.
 * @param {Event} event - The event object triggering the move.
 * @returns {void} - This function does not return a value.
 */
function moveFromInProgress(taskID, event){
    event.stopPropagation(); 
    let taskIDNumber = parseInt(taskID);
    let sourceCategory = findSourceCategoryByTaskID(taskIDNumber);
    if (sourceCategory == 'inProgress') {
        let taskToMove = contactData[0].tasks[0][sourceCategory].find(task => task.taskID === taskIDNumber);
        if (taskToMove) {
            moveClickedTask(sourceCategory, 'toDo', taskToMove); 
            saveUserTasksToServer(); 
            updateHTMLBoard(); 
        }
    } 
}

/**
 * Moves a task from 'Awaiting Feedback' category to 'In Progress' category.
 * @function moveFromAwaitFeedback
 * @param {string} taskID - The ID of the task to move.
 * @param {Event} event - The event object triggering the move.
 * @returns {void} - This function does not return a value.
 */
function moveFromAwaitFeedback(taskID, event){
    event.stopPropagation(); 
    let taskIDNumber = parseInt(taskID);
    let sourceCategory = findSourceCategoryByTaskID(taskIDNumber);
    if (sourceCategory == 'awaitFeedback') {
        let taskToMove = contactData[0].tasks[0][sourceCategory].find(task => task.taskID === taskIDNumber);
        if (taskToMove) {
            moveClickedTask(sourceCategory, 'inProgress', taskToMove); 
            saveUserTasksToServer(); 
            updateHTMLBoard(); 
        }
    } 
}

/**
 * Moves a task from 'Done' category to 'Awaiting Feedback' category.
 * @function moveFromDone
 * @param {string} taskID - The ID of the task to move.
 * @param {Event} event - The event object triggering the move.
 * @returns {void} - This function does not return a value.
 */
function moveFromDone(taskID, event){
    event.stopPropagation(); 
    let taskIDNumber = parseInt(taskID);
    let sourceCategory = findSourceCategoryByTaskID(taskIDNumber);
    if (sourceCategory == 'done') {
        let taskToMove = contactData[0].tasks[0][sourceCategory].find(task => task.taskID === taskIDNumber);
        if (taskToMove) {
            moveClickedTask(sourceCategory, 'awaitFeedback', taskToMove); 
            saveUserTasksToServer(); 
            updateHTMLBoard(); 
        }
    }
}

/**
 * Moves a task from 'Awaiting Feedback' category to 'Done' category.
 * @function moveToDone
 * @param {string} taskID - The ID of the task to move.
 * @param {Event} event - The event object triggering the move.
 * @returns {void} - This function does not return a value.
 */
function moveToDone(taskID, event){
    event.stopPropagation(); 
    let taskIDNumber = parseInt(taskID);
    let sourceCategory = findSourceCategoryByTaskID(taskIDNumber);
    if (sourceCategory == 'awaitFeedback') {
        let taskToMove = contactData[0].tasks[0][sourceCategory].find(task => task.taskID === taskIDNumber);
        if (taskToMove) {
            moveClickedTask(sourceCategory, 'done', taskToMove); 
            saveUserTasksToServer(); 
            updateHTMLBoard(); 
        }
    } 
}

/**
 * Moves a task from 'In Progress' category to 'Awaiting Feedback' category.
 * @function moveToAwaitFeedback
 * @param {string} taskID - The ID of the task to move.
 * @param {Event} event - The event object triggering the move.
 * @returns {void} - This function does not return a value.
 */
function moveToAwaitFeedback(taskID, event){
    event.stopPropagation(); 
    let taskIDNumber = parseInt(taskID);
    let sourceCategory = findSourceCategoryByTaskID(taskIDNumber);
    if (sourceCategory == 'inProgress') {
        let taskToMove = contactData[0].tasks[0][sourceCategory].find(task => task.taskID === taskIDNumber);
        if (taskToMove) {
            moveClickedTask(sourceCategory, 'awaitFeedback', taskToMove); 
            saveUserTasksToServer(); 
            updateHTMLBoard(); 
        }
    }
}

/**
 * Moves a task from 'To Do' category to 'In Progress' category.
 * @function moveToInProgress
 * @param {string} taskID - The ID of the task to move.
 * @param {Event} event - The event object triggering the move.
 * @returns {void} - This function does not return a value.
 */
function moveToInProgress(taskID, event) {
    event.stopPropagation(); 
    let taskIDNumber = parseInt(taskID);
    let sourceCategory = findSourceCategoryByTaskID(taskIDNumber);
    if (sourceCategory == 'toDo') {
        let taskToMove = contactData[0].tasks[0][sourceCategory].find(task => task.taskID === taskIDNumber);
        if (taskToMove) {
            moveClickedTask(sourceCategory, 'inProgress', taskToMove); 
            saveUserTasksToServer(); 
            updateHTMLBoard(); 
        }
    } 
}

/**
 * Moves a task from one category to another within the contactData.
 * @function moveClickedTask
 * @param {string} sourceCategory - The source category of the task.
 * @param {string} targetCategory - The target category to move the task into.
 * @param {object} taskToMove - The task object to move.
 * @returns {void} - This function does not return a value.
 */
function moveClickedTask(sourceCategory, targetCategory, taskToMove) {
    let index = contactData[0].tasks[0][sourceCategory].findIndex(task => task.taskID === taskToMove.taskID);
    if (index !== -1) {
        let removedTask = contactData[0].tasks[0][sourceCategory].splice(index, 1)[0];
        contactData[0].tasks[0][targetCategory].push(removedTask);
    }
}

/**
 * Finds the source category of a task given its task ID within the contactData.
 * @function findSourceCategoryByTaskID
 * @param {number} taskID - The ID of the task to find the source category for.
 * @returns {string|null} - The source category of the task, or null if not found.
 */
function findSourceCategoryByTaskID(taskID) {
    let sourceCategory = null;
    for (let categoryKey in contactData[0].tasks[0]) {
        let categoryTasks = contactData[0].tasks[0][categoryKey];
        let taskInCategory = categoryTasks.find(task => task.taskID === taskID);
        if (taskInCategory) {
            sourceCategory = categoryKey;
            break;
        }
    }
    return sourceCategory; 
}

/**
 * Deselects (removes highlight from) all task columns on the board.
 * @function deselectHighlight
 */
function deselectHighlight() {
    document.getElementById('to-do-column').classList.remove('dragarea-highlight')
    document.getElementById('in-progress-column').classList.remove('dragarea-highlight')
    document.getElementById('await-feedback-column').classList.remove('dragarea-highlight')
    document.getElementById('done-column').classList.remove('dragarea-highlight')
}

/**
 * Sets the current dragged element (task) when dragging starts.
 * @function startDragging
 * @param {string} taskID - The ID of the task being dragged.
 */
function startDragging(taskID) {
    currentDraggedElement = taskID;
}

/**
 * Moves a task to the specified category on the board.
 * @function moveTo
 * @param {string} category - The target category to move the task to.
 */
async function moveTo(category) {
    let sourceCategory = findSourceCategory();
    if (sourceCategory) {
        let taskToMove = contactData[0].tasks[0][sourceCategory].find(task => task.taskID === currentDraggedElement);
        if (taskToMove) {
            moveTask(sourceCategory, category, taskToMove);
            await saveUserTasksToServer();
            updateHTMLBoard();
        }
    }
}

/**
 * Finds the source category of the currently dragged task based on its task ID.
 * @function findSourceCategory
 * @returns {string | null} - The source category of the dragged task, or null if not found.
 */
function findSourceCategory() {
    let sourceCategory = null;
    for (let categoryKey in contactData[0].tasks[0]) {
        let categoryTasks = contactData[0].tasks[0][categoryKey];
        let taskInCategory = categoryTasks.find(task => task.taskID === currentDraggedElement);
        if (taskInCategory) {
            sourceCategory = categoryKey;
            break;
        }
    }
    return sourceCategory;
}

/**
 * Moves a task from the source category to the destination category.
 * @function moveTask
 * @param {string} sourceCategory - The source category from which the task is being moved.
 * @param {string} destinationCategory - The destination category to which the task is being moved.
 * @param {Object} taskToMove - The task object that is being moved.
 */
function moveTask(sourceCategory, destinationCategory, taskToMove) {
    contactData[0].tasks[0][sourceCategory] = contactData[0].tasks[0][sourceCategory].filter(task => task.taskID !== currentDraggedElement);
    contactData[0].tasks[0][destinationCategory].push(taskToMove);
}

/**
 * Allows dropping of draggable elements by preventing the default behavior.
 * @function allowDrop
 * @param {Event} event - The dragover event object.
 */
function allowDrop(event) {
    event.preventDefault();
}

/**
 * Filters tasks by category from the contact data.
 * @function filterTasksByCategory
 * @param {string} category - The category to filter tasks by.
 * @returns {Object} - An object containing filtered tasks grouped by category.
 */
function filterTasksByCategory(category) {
    let tasks = contactData[0].tasks[0];
    let filteredTasks = {
        'toDo': tasks.toDo.filter(task => task.category === category),
        'inProgress': tasks.inProgress.filter(task => task.category === category),
        'awaitFeedback': tasks.awaitFeedback.filter(task => task.category === category),
        'done': tasks.done.filter(task => task.category === category)
    };
    return filteredTasks;
}

/**
 * Adds initials to assigned contacts of a ToDo task.
 * @function addInitialsToAssignedContacts
 * @param {Object} toDoTask - The ToDo task object containing assigned contacts.
 */
function addInitialsToAssignedContacts(toDoTask) {
    for (let i = 0; i < toDoTask.assigned_contacts.length; i++) {
        let contact = toDoTask.assigned_contacts[i];
        let initialsFirst = contact.first.substring(0, 1).toUpperCase();
        let initialsName = contact.name.substring(0, 1).toUpperCase();
        contact.ini_first = initialsFirst;
        contact.ini_name = initialsName;
    }
}

/**
 * Calculates the fill width percentage for a ToDo task based on subtask completion.
 * @function calculateFillWidth
 * @param {Object} toDoTask - The ToDo task object for which fill width is calculated.
 * @returns {string} - The fill width percentage as a CSS string (e.g., '50%').
 */
function calculateFillWidth(toDoTask) {
    let doneSubtasksCount = getDoneSubtasksCount(toDoTask);
    let totalSubtasksCount = getTotalSubtasksCount(toDoTask);
    if (totalSubtasksCount > 0) {
        let fillPercentage = (doneSubtasksCount / totalSubtasksCount) * 100;
        fillPercentage = Math.min(100, Math.max(0, fillPercentage));
        return `${fillPercentage}%`;
    } else {
        return '0%';
    }
}

/**
 * Displays a notification with subtask completion details.
 * @function showSubtaskDetails
 * @param {number} doneSubtasksCount - The count of completed subtasks.
 * @param {number} totalSubtasksCount - The total count of subtasks.
 */
function showSubtaskDetails(doneSubtasksCount, totalSubtasksCount) {
    let doneSubtasksCountText = doneSubtasksCount;
    let totalSubtasksCountText = totalSubtasksCount;
    let toastNotification = document.getElementById("toastNotification");
    toastNotification.innerText = `${doneSubtasksCountText} of ${totalSubtasksCountText} already finished.`;
    toastNotification.style.display = "block";
    setTimeout(function () {
        toastNotification.style.display = "none";
    }, 2000);
}

/**
 * Counts the number of completed subtasks in a ToDo task.
 * @function getDoneSubtasksCount
 * @param {Object} toDoTask - The ToDo task object containing subtasks.
 * @returns {number} - The count of completed subtasks.
 */
function getDoneSubtasksCount(toDoTask) {
    let doneSubtasksCount = 0;
    if (toDoTask.subtasks && Array.isArray(toDoTask.subtasks)) {
        for (let i = 0; i < toDoTask.subtasks.length; i++) {
            let subtask = toDoTask.subtasks[i];
            if (subtask.status && subtask.status.toLowerCase() === 'done') {
                doneSubtasksCount++;
            }
        }
    }
    return doneSubtasksCount;
}

/**
 * Counts the total number of subtasks in a ToDo task.
 * @function getTotalSubtasksCount
 * @param {Object} toDoTask - The ToDo task object containing subtasks.
 * @returns {number} - The total count of subtasks.
 */
function getTotalSubtasksCount(toDoTask) {
    let totalSubtasksCount = 0;
    if (toDoTask.subtasks && Array.isArray(toDoTask.subtasks)) {
        totalSubtasksCount = toDoTask.subtasks.length;
    }
    return totalSubtasksCount;
}

/**
 * Highlights a specific board column by adding a CSS class for drag area highlighting.
 * @function highlightBoardColumn
 * @param {string} id - The ID of the board column to highlight ('toDo', 'inProgress', 'awaitFeedback', 'done').
 */
function highlightBoardColumn(id) {
    let currentHighlightColumn = id;
    if (currentHighlightColumn == 'toDo') {
        document.getElementById('to-do-column').classList.add('dragarea-highlight');
    }
    else if (currentHighlightColumn == 'inProgress') {
        document.getElementById('in-progress-column').classList.add('dragarea-highlight');
    }
    else if (currentHighlightColumn == 'awaitFeedback') {
        document.getElementById('await-feedback-column').classList.add('dragarea-highlight');
    }
    else {
        document.getElementById('done-column').classList.add('dragarea-highlight');
    }
}

/**
 * Removes highlighting from a specific board column by removing a CSS class for drag area highlighting.
 * @function dehighlightBoardColumns
 * @param {string} id - The ID of the board column to dehighlight ('toDo', 'inProgress', 'awaitFeedback', 'done').
 */
function dehighlightBoardColumns(id) {
    let currentHighlightColumn = id;
    if (currentHighlightColumn == 'toDo') {
        document.getElementById('to-do-column').classList.remove('dragarea-highlight')
    }
    else if (currentHighlightColumn == 'inProgress') {
        document.getElementById('in-progress-column').classList.remove('dragarea-highlight')
    }
    else if (currentHighlightColumn == 'awaitFeedback') {
        document.getElementById('await-feedback-column').classList.remove('dragarea-highlight')
    }
    else {
        document.getElementById('done-column').classList.remove('dragarea-highlight')
    }
}

/**
 * Sets focus on the search input field of the board.
 * @function focusSearchInput
 */
function focusSearchInput() {
    let searchFocus = document.getElementById('board-input-field')
    searchFocus.focus()
}

/**
 * Displays a toast message on the UI.
 * @function showToastMessage
 * @param {string} message - The message to display in the toast.
 */
function showToastMessage(message) {
    let toast = document.getElementById('toastMessage');
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(function () {
        toast.style.display = 'none';
    }, 2000);
}

/**
 * Filters tasks by category and search query.
 * @function filterTasksByCategory
 * @param {string} category - The category of tasks to filter ('toDo', 'inProgress', 'awaitFeedback', 'done').
 * @param {string} search - The search query used to filter tasks by title or description.
 * @returns {Array} - An array of tasks filtered by the specified category and search query.
 */
function filterTasksByCategory(category, search) {
    if (contactData && contactData.length > 0 && contactData[0].tasks && contactData[0].tasks[0]) {
        let tasksInCategory = contactData[0].tasks[0][category] || [];
        let filteredTasks = tasksInCategory.filter(task =>
            task.title.toLowerCase().includes(search) ||
            task.description.toLowerCase().includes(search)
        );
        return filteredTasks;
    } else {
        return [];
    }
}

/**
 * Slides in the task detail view container if it's not already visible.
 * @function slideIn
 */
function slideIn() {
    if (detailwindow == false) {
        let taskDetailView = document.getElementById('detailview-container');
        taskDetailView.classList.add('show');
    }
    detailwindow = true;
}

/**
 * Slides out the task detail view container if it's currently visible.
 * @function slideOut
 */
function slideOut() {
    if (detailwindow == true) {
        document.getElementById('detailview-container').classList.remove('show');
        removeDarkBackground();
        hideOverlay();
    }
    detailwindow = false;
}

/**
 * Removes the dark background if it's currently visible.
 * @function removeDarkBackground
 */
function removeDarkBackground() {
    setTimeout(function () {
        document.getElementById("darkBackgroundContainer").classList.add("swipeOutBackground");
        document.getElementById("darkBackgroundContainer").classList.add("d-none");
    }, 300);
}

/**
 * Formats a date string into a specified date format (e.g., 'DD/MM/YYYY').
 * @function formatDate
 * @param {string} dateString - The date string to format.
 * @returns {string} - The formatted date string in 'DD/MM/YYYY' format.
 */
function formatDate(dateString) {
    let options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    let formattedDate = new Date(dateString).toLocaleDateString(undefined, options).replace(/\./g, '/');
    return formattedDate;
}

/**
 * Finds a task by its unique task ID across all task categories.
 * @function findTaskByID
 * @param {string} taskID - The unique identifier (taskID) of the task to find.
 * @returns {Object|null} - The found task object if the taskID matches; otherwise, null.
 */
function findTaskByID(taskID) {
    for (let categoryKey in contactData[0].tasks[0]) {
        let categoryTasks = contactData[0].tasks[0][categoryKey];
        let foundTask = categoryTasks.find(task => task.taskID == taskID);
        if (foundTask) {
            return foundTask;
        }
    }
    return null;
}

/**
 * Determines the text and image representation of a task priority based on a priority level.
 * @function taskPriority
 * @param {number} priority - The priority level of the task (0 for Urgent, 1 for Medium, 2 for Low).
 * @returns {Object} - An object containing the text and image representation of the task priority.
 */
function taskPriority(priority) {
    switch (priority) {
        case 0:
            return { text: "Urgent", image: "../img/board/prio_high.svg" };
        case 1:
            return { text: "Medium", image: "../img/board/prio_equation.svg" };
        case 2:
            return { text: "Low", image: "../img/board/prio_low.svg" };
        default:
            return { text: "", image: "" };
    }
}

/**
 * Adds initials based on the first character of the last name to each contact in the contactData.
 * @param {Array} contactData - The array containing contact data.
 * @function addNameInitialToContacts
 * @returns {void}
 */
function addNameInitialToContacts(contactData) {
    if (contactData.length > 0 && contactData[0].contacts) {
        for (let i = 0; i < contactData[0].contacts.length; i++) {
            let name = contactData[0].contacts[i].name;
            let initials = name.substring(0, 1).toUpperCase();
            contactData[0].contacts[i].ini_name = initials;
        }
    }
}

/**
 * Adds initials of first names to contacts in the provided contactData.
 * @function addInitialsOfFirstNames
 * @param {Array} contactData - An array containing contact data.
 */
function addInitialsOfFirstNames(contactData) {
    if (contactData.length > 0 && contactData[0].contacts) {
        for (let i = 0; i < contactData[0].contacts.length; i++) {
            if (contactData[0].contacts[i].firstname) {
                let first = contactData[0].contacts[i].firstname;
                let inits = first.substring(0, 1).toUpperCase();
                contactData[0].contacts[i].ini_first = inits;
            }
        }
    }
}
