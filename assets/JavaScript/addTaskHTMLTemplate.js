/**
 * Generates HTML for rendering a task dropdown item with contact details.
 * @function addTaskRenderDropDown
 * @param {number} i - The index or ID of the task dropdown item.
 * @param {string} avatarColor - The avatar color for the contact.
 * @param {string} ini_firstname - The first initial of the contact's first name.
 * @param {string} ini_name - The first initial of the contact's last name.
 * @param {string} firstname - The contact's first name.
 * @param {string} lastname - The contact's last name.
 * @returns {string} - The HTML string representing the task dropdown item with contact details.
 */
function addTaskRenderDropDown(i, avatarColor, ini_firstname, ini_name, firstname, lastname){
    return`
    <label class="f-btw" >
        <div class="dropdown-span-block">
            <span id="specificColor${i}" class="initials-dropdown-styling" style="background-color: ${avatarColor};">${ini_firstname}${ini_name}</span>
            <span>${firstname} ${lastname}</span>
        </div>
        <input type="checkbox" data-contact-id="${i}" id="checkbox-${i}" onchange="toggleCheckbox(${i})">
    </label>
`;
}

/**
 * Generates HTML markup for a contact item in the add task template dropdown list.
 * @param {number} i - Index of the contact.
 * @param {string} avatarColor - Color code for the contact's avatar.
 * @param {string} ini_first - Initials of the contact's first name.
 * @param {string} ini_name - Initials of the contact's last name.
 * @param {string} first - First name of the contact.
 * @param {string} lastname - Last name of the contact.
 * @returns {string} - HTML markup representing the contact item.
 */
function filterContactsAddTaskTemplate(i, avatarColor, ini_first, ini_name, first, lastname){
return`
<label class="f-btw" onclick="selectOption(${i})">
    <div class="dropdown-span-block">
        <span id="specificColor${i}" class="initials-dropdown-styling" style="background-color: ${avatarColor};">${ini_first}${ini_name}</span>
        <span>${first} ${lastname}</span>
    </div>
    <input type="checkbox">
</label>
`;
}

/**
 * Generates HTML for adding a task toggle dropdown opener.
 * @function addTaskToggleDropDownOpen
 * @returns {string} - The HTML string representing the task toggle dropdown opener.
 */
function addTaskToggleDropDownOpen(){
   return`
   <input onkeyup="filterContacts()" id="assign-search-input" type="text">
   <img id="turned-drop-down-image" src="../img/add_task/turned_arrow_drop_down.svg">
   `; 
}

/**
 * Generates HTML for adding a task toggle dropdown closer.
 * @function addTaskToggleDropDownClose
 * @returns {string} - The HTML string representing the task toggle dropdown closer.
 */
function addTaskToggleDropDownClose(){
return`
<span class="add-task-font-styling">Select contacts to assign</span>
<img class="hover-lg" id="drop-down-arrow" src="../img/add_task/arrow_drop_down.svg">
`
}

/**
 * Generates HTML for clearing a form template.
 * @function clearFormTemplate
 * @returns {string} - The HTML string representing the cleared form template.
 */
function clearFormTemplate(){
    return`
    <span class="add-task-font-styling">Select contacts to assign</span><img id="drop-down-arrow" src="../img/add_task/arrow_drop_down.svg">
    `
}

/**
 * Generates HTML template for rendering chosen contacts.
 * @function renderChosenContactsHTMLTemplate
 * @param {number} index - The position index of the contact.
 * @param {string} contactavatarColor - The background color for the avatar.
 * @param {string} contactini_first - The first initial of the contact's first name.
 * @param {string} contactini_name - The first initial of the contact's last name.
 * @returns {string} - The HTML string representing the template for rendering chosen contacts.
 */
function renderChosenContactsHTMLTemplate(index, contactavatarColor, contactini_first, contactini_name){
    return`<span data-position="${index}" class="initials-dropdown-styling" 
    style="background-color: ${contactavatarColor};">${contactini_first}${contactini_name}</span>`;
}

/**
 * Generates the HTML template for a new subtask.
 * This function creates an HTML string for a newly created subtask, including the subtask text and edit/delete icons.
 * @function addNewSubtaskHTMLTemplate
 * @param {string} createdSubtaskID - The ID for the newly created subtask element.
 * @param {string} newSubtaskInput - The text input for the new subtask.
 * @returns {string} The HTML string for the new subtask element.
 */
function addNewSubtaskHTMLTemplate(createdSubtaskID, newSubtaskInput){
    return`
    <div id="${createdSubtaskID}" class="created-subtask-div-styling">
        <span>${newSubtaskInput}</span>
        <div  class="subtasks-images-before-hover">
            <img class="created-subtask-pencil-image" onclick=editCurrentAddTaskSubtask('${createdSubtaskID}') src="../img/add_task/edit.svg">
            <img class="created-subtask-bin-image" onclick="deleteCurrentCreatedSubtask('${createdSubtaskID}')" src="../img/add_task/delete.svg">
        </div>
    </div>
    `;
}

/**
 * Generates the HTML template for editing a current subtask.
 * This function creates an HTML string for a subtask that is being edited, including an input field with the current subtask text and save/cancel icons.
 * @function editCurrentAddTaskSubtaskHTMLTemplate
 * @param {string} createdSubtaskID - The ID for the subtask element being edited.
 * @param {string} subtaskText - The current text of the subtask being edited.
 * @returns {string} The HTML string for the subtask element in edit mode.
 */
function editCurrentAddTaskSubtaskHTMLTemplate(createdSubtaskID, subtaskText){
    return`
    <div id="${createdSubtaskID}" class="created-subtask-div-styling">
        <input type="text" value="${subtaskText}" class="subtask-input" />
        <div class="subtasks-images-before-hover">
            <img class="created-subtask-pencil-image" onclick="saveEditedSubtask('${createdSubtaskID}')" src="../img/add_task/check_mat.svg">
            <img class="created-subtask-bin-image" onclick="cancelCurrentEditingSubtask('${createdSubtaskID}')" src="../img/add_task/cancel_image.svg">
        </div>
    </div>
`;   
}

/**
 * Generates the HTML template for displaying a subtask after it has been edited and saved.
 * This function creates an HTML string for a subtask that has been edited, including the updated subtask text and edit/delete icons.
 * @function saveEditedSubtaskHTMLTemplate
 * @param {string} createdSubtaskID - The ID for the subtask element that has been edited.
 * @param {string} editedSubtaskText - The updated text of the subtask.
 * @returns {string} The HTML string for the subtask element after it has been edited.
 */
function saveEditedSubtaskHTMLTemplate(createdSubtaskID, editedSubtaskText){
    return`
    <div id="${createdSubtaskID}" class="created-subtask-div-styling">
        <span>${editedSubtaskText}</span>
        <div class="subtasks-images-before-hover">
            <img class="created-subtask-pencil-image" onclick="editCurrentAddTaskSubtask('${createdSubtaskID}')" src="../img/add_task/edit.svg">
            <img class="created-subtask-bin-image" onclick="deleteCurrentCreatedSubtask('${createdSubtaskID}')" src="../img/add_task/delete.svg">
        </div>
    </div>
`;   
}

/**
 * Generates the HTML template for displaying a subtask when editing is canceled.
 * This function creates an HTML string for a subtask that reverts back to its original text and includes edit/delete icons.
 * @function cancelCurrentEditingSubtaskHTMLTemplate
 * @param {string} createdSubtaskID - The ID for the subtask element that is being reverted.
 * @param {string} originalSubtaskText - The original text of the subtask before editing.
 * @returns {string} The HTML string for the subtask element after canceling the edit.
 */
function cancelCurrentEditingSubtaskHTMLTemplate(createdSubtaskID, originalSubtaskText){
    return`
    <div id="${createdSubtaskID}" class="created-subtask-div-styling">
        <span>${originalSubtaskText}</span>
        <div class="subtasks-images-before-hover">
            <img class="created-subtask-pencil-image" onclick="editCurrentAddTaskSubtask('${createdSubtaskID}')" src="../img/add_task/edit.svg">
            <img class="created-subtask-bin-image" onclick="deleteCurrentCreatedSubtask('${createdSubtaskID}')" src="../img/add_task/delete.svg">
        </div>
    </div>
`;
}