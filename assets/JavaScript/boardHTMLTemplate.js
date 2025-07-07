/**
 * Generates HTML template for displaying a message when there are no tasks to do.
 * @function noTasksToDoTemplate
 * @returns {string} - The HTML string representing the template for no tasks to do.
 */
function noTasksToDoTemplate() {
  return `
   <div class="no-task cursor-pointer">
       <span class="no-task-span">No tasks To do</span>
   </div>
`;
}

/**
 * Generates HTML template for displaying a message when there are no tasks in progress.
 * @function noTasksInProgressTemplate
 * @returns {string} - The HTML string representing the template for no tasks in progress.
 */
function noTasksInProgressTemplate() {
  return `
<div class="no-task cursor-pointer">
    <span class="no-task-span">No tasks In progress</span>
</div>
`;
}

/**
 * Generates HTML template for displaying a message when there are no tasks awaiting feedback.
 * @function noTasksAwaitFeedbackTemplate
 * @returns {string} - The HTML string representing the template for no tasks awaiting feedback.
 */
function noTasksAwaitFeedbackTemplate() {
  return `
<div class="no-task cursor-pointer">
    <span class="no-task-span">No tasks Await feedback</span>
</div>
`;
}

/**
 * Generates HTML template for displaying a message when there are no tasks marked as done.
 * @function noTasksDoneTemplate
 * @returns {string} - The HTML string representing the template for no tasks marked as done.
 */
function noTasksDoneTemplate() {
  return `
<div class="no-task cursor-pointer">
    <span class="no-task-span">No tasks Done</span>
</div>
`;
}

/**
 * Generates HTML template for opening a dropdown overlay in board task.
 * @function openDDOverlayBoardTaskTemplate
 * @returns {string} - The HTML string representing the template for opening a dropdown overlay.
 */
function openDDOverlayBoardTaskTemplate() {
  return `
<input onkeyup="filterBoardOverlayContacts()" id="assign-search-board-overlay-input" type="text">
<img id="turned-drop-down-board-overlay-image" src="../img/add_task/turned_arrow_drop_down.svg">
`;
}

/**
 * Generates HTML template for closing a dropdown overlay in board task.
 * @function closeDDOverlayBoardTaskTemplate
 * @returns {string} - The HTML string representing the template for closing a dropdown overlay.
 */
function closeDDOverlayBoardTaskTemplate() {
  return `
<span class="add-task-font-styling">Select contacts to assign</span>
<img class="hover-lg" id="drop-down-board-overlay-arrow" src="../img/add_task/arrow_drop_down.svg">
`;
}

/**
 * Generates HTML template for adding task contacts in a board.
 * @function boardAddTaskContactsTemplate
 * @param {number} i - The index of the contact.
 * @param {string} avatarColor - The color for the avatar background.
 * @param {string} firstIni - The first initial of the contact's first name.
 * @param {string} lastIni - The first initial of the contact's last name.
 * @param {string} firstName - The first name of the contact.
 * @param {string} lastName - The last name of the contact.
 * @returns {string} - The HTML string representing the template for adding task contacts.
 */
function boardAddTaskContactsTemplate(
  i,
  avatarColor,
  firstIni,
  lastIni,
  firstName,
  lastName
) {
  return `
    <label class="f-btw">
        <div class="dropdown-span-block">
            <span id="specificColor${i}" class="initials-dropdown-styling" style="background-color: ${avatarColor};">${firstIni}${lastIni}</span>
            <span>${firstName} ${lastName}</span>
        </div>
        <input type="checkbox" data-contact-id="${i}" id="checkbox-${i}" onchange="toggleCheckboxBoardOverlay(${i})">    </label>
`;
}

/**
 * Generates HTML template for filtering and displaying task contacts in a board.
 * @function filterBoardAddTaskContactsTemplate
 * @param {number} i - The index of the contact.
 * @param {string} avatarColor - The color for the avatar background.
 * @param {string} searchedFirstIni - The first initial of the searched contact's first name.
 * @param {string} searchedLastIni - The first initial of the searched contact's last name.
 * @param {string} searchedFirstName - The first name of the searched contact.
 * @param {string} searchedLastName - The last name of the searched contact.
 * @returns {string} - The HTML string representing the template for filtered task contacts.
 */
function filterBoardAddTaskContactsTemplate(
  i,
  avatarColor,
  searchedFirstIni,
  searchedLastIni,
  searchedFirstName,
  searchedLastName
) {
  return `
    <label class="f-btw" onclick="selectOption(${i})">
        <div class="dropdown-span-block">
            <span id="specificColor${i}" class="initials-dropdown-styling" style="background-color: ${avatarColor};">${searchedFirstIni}${searchedLastIni}</span>
            <span>${searchedFirstName} ${searchedLastName}</span>
        </div>
        <input type="checkbox">
    </label>
`;
}

/**
 * Generates HTML template for adding a task to the board overlay.
 * @function boardAddTaskTemplate
 * @returns {string} - The HTML string representing the template for adding a task to the board overlay.
 */
function boardAddTaskTemplate() {
  return `
<div>
   <div id="add-task-board-context">
       <div class="flex-space-between add-board-first-line">
           <h2 class="add-board-heading">Add Task</h2>
           <img class="cp scale-view-up" onclick="closeAddTaskView()" src="../img/board/close.svg">
       </div> 
       <div class="add-board-second-line flex-row">
           <div class="add-board-left-column">
               <div id="title-board-overlay-div">
                   <div id="title-title-board-overlay-div">
                       <span class="add-task-font-styling">Title</span>
                       <span class="red-star-styling">*</span>
                   </div>
                   <input required id="add-task-title-board-overlay-input" class="add-task-placeholder-font-styling"
                                placeholder="Enter a title">
               </div>
               <div id="description-board-overlay-div">
                   <span class="add-task-font-styling">Description</span>
                   <textarea id="add-task-description-board-overlay-textarea" class="add-task-placeholder-font-styling"
                        placeholder="Enter a Description"></textarea>
               </div>
            <div id="assigned-to-board-overlay-div" class="add-task-font-styling">
               <span class="add-task-font-styling">Assigned to</span>
               <div id="assigned-dropdown-board-overlay-div" onclick="toggleBoardOverlayDropDown()">
                   <span class="add-task-font-styling">Select contacts to assign</span>
                   <img id="drop-down-board-overlay-arrow" src="../img/add_task/arrow_drop_down.svg" >
               </div>
               <div id="drop-down-board-overlay-content">
               </div>               
           </div>
           <div class="" id="assigned-contacts-after-choosing-board-overlay"></div>
       </div>
       <div class="add-board-dividing-column">
       </div>
       <div class="add-board-right-column">
           <div id="due-date-board-overlay-div">
               <div>
                   <span class="add-task-font-styling">Due date</span>
                   <span class="red-star-styling">*</span>
               </div>
               <div id="div-board-overlay-dateformchange">
                   <input required id="due-date-board-overlay-input" oninput="validateDate(this)" onfocus="(this.type='date')"
                                                  onblur="(this.type='text')" 
                                       placeholder="dd/mm/yyyy" max="2100-12-31" required>
               </div>
           </div>
           <div id="prio-board-overlay-div">
               <div id="heading-prio--boar-overlay-div">
                   <span class="add-task-font-styling">Prio</span>
               </div>
               <div class="prio-buttons-board-overlay-div">
                   <div onfocus="addUrgentOverlayStatus()" onblur="removeUrgentOverlayStatus()" class="priority-board-overlay-button toggle-prio-button" id="urgent-board-overlay-button" tabindex="4">
                       <span id="urgent-add-board-overlay-span" class="add-task-font-styling">Urgent</span>
                       
                       <img id="urgent-board-overlay-image" src="../img/add_task/urgent-red.svg">
                   </div>
                   <div  onfocus="addMediumOverlayStatus()" onblur="removeMediumOverlayStatus()" class="priority-board-overlay-button toggle-prio-board-overlay-button" id="medium-board-overlay-button" tabindex="5">
                       <span id="medium-add-board-overlay-span" class="add-task-font-styling">Medium </span>
                      
                       <img id="medium-board-overlay-image" src="../img/add_task/equity_yellow.svg">
                   </div>
                   <div  onfocus="addLowOverlayStatus()" onblur="removeLowOverlayStatus()"  class="priority-board-overlay-button toggle-prio-board-overlay-button" id="low-board-overlay-button" tabindex="6">
                       <span id="low-add-board-overlay-span" class="add-task-font-styling">Low</span>
                       <img id="low-board-overlay-image" src="../img/add_task/low-green.svg">
                   </div>
               </div>
           </div>
       <div id="category-board-overlay-div"> 
           <label for="contacts-assignment">
               <span class="add-task-font-styling">Category</span>
               <span class="red-star-styling">*</span>
           </label>
           <div class="category-border-div">
               <select required id="task-category-board-overlay-select" name="assignment" class="category-board-overlay-flex add-task-font-styling ">
                   <option>Select Task Category</option>
                   <option value="Technical Task">Technical Task</option>
                   <option value="User Story">User Story</option>
               </select>
           </div>
       </div>
       <div id="subtasks-board-overlay-div">
           <span class="add-task-font-styling" id="subtask-title-board-overlay-span">Subtask</span>
           <div id="subtask-input-board-overlay-div">
               <input class="add-task-font-styling" id="subtask-input-board-overlay-field" placeholder="Add new Subtask">
               <img onclick="addNewOverlaySubtask()" id="subtask-add-board-overlay-button" src="../img/add_task/add.png">

           </div>
           <div id="created-board-overlay-subtasks">
           </div>
       </div>
   </div>
       </div>
       <div class="add-board-thirdline">
           <div class="add-board.third-line-left">
               <span class="red-star-styling">*</span>
               <span>This field is required</span>
           </div>
           <div class="add-board-third-line-right">
               <div class="add-board-cancel-div" onclick=" closeAddTaskView()" onmouseover="changeCloseLightblue()" onmouseout="changeCloseToBlack()">
                   <span class="add-board-cancel-span">Cancel</span>
                   <img id="cancel-image-add-board" class="add-board-cancel-image" src="../img/board/close.svg">
               </div>
               <div class="add-board-create-div" onclick="addTaskBoardOverlay()">
                   <span class="add-board-create-span">Create Task</span>
                   <img  class="add-board-check-image" src="../img/board/check.svg">
               </div>
           </div>
       </div>
   </div>
</div>
`;
}

/**
 * Generates HTML template for opening a drop-down in the board overlay.
 * @function openDropDownBoardTemplate
 * @returns {string} - The HTML string representing the template for opening a drop-down in the board overlay.
 */
function openDropDownBoardTemplate() {
  return `
    <input onkeyup="filterEditContacts()" id="assign-search-board-edit-input" type="text">
    <img id="turned-drop-down-board-overlay-image" src="../img/add_task/turned_arrow_drop_down.svg">
    `;
}

/**
 * Generates HTML template for closing a drop-down in the board overlay.
 * @function closeDropDownBoardTemplate
 * @returns {string} - The HTML string representing the template for closing a drop-down in the board overlay.
 */
function closeDropDownBoardTemplate() {
  return `
       <span class="add-task-font-styling">Select contacts to assign</span>
       <img class="hover-lg" id="drop-down-board-overlay-arrow" src="../img/add_task/arrow_drop_down.svg">
       `;
}

/**
 * Generates HTML content for rendering an editable task with specific details.
 * @function renderEditTaskContent
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {string} formattedDueDate - The formatted due date of the task.
 * @param {string} taskID - The ID of the task.
 * @returns {string} - The HTML string representing the editable task content.
 */
function renderEditTaskContent(title, description, formattedDueDate, taskID) {
  return `
        <div class="flex-end ">
        <img src="../img/board/close.svg" class="close-button-taskdetail"  onclick="slideOut()">
        </div>
        <form onsubmit="return false" class="scrollbar-edit">
        <div class="flex-clmn">
        <div class="edit-task-title-div">
        <label class="user-none edit-headings-style">Title</label>
        <input id="edit-title-value-input" class="edit-input-title"  required value="${title}">
        </div>
        <div class="edit-task-description-div">
        <label class="user-none edit-headings-style">Description</label>
        <textarea id="edit-textarea-input" class="border-text fontstyle-edit">${description}</textarea>
        </div>
        <div>
        <span>Due date</span>
        <div class="date-render-image-div">
        <input id="taskdetail-date-input" value="${formattedDueDate}" oninput="validateDate(this)" max="2100-12-31" onfocus="(this.type='date')"
            onblur="(this.type='text')" 
            class="edit-date-placeholder" required>
        </div>
        </div>
        <div>
        <span class="priorityHeadText">Priority</span>
        <div  id="edit-prio-sup-div">
        <div onfocus="addUrgentStatus()" onblur="removeUrgentStatus()" class="edit-prio-div" id="edit-urgent-div" tabindex="1">
        <span id="edit-urgent-span">Urgent</span>
        <img id="edit-urgent-image" src="../img/board/urgent-red.svg">
        </div>
        <div onfocus="addMediumStatus()" onblur="removeMediumStatus()" class="edit-prio-div"  id="edit-medium-div" tabindex="2">
        <span id="edit-medium-span">Medium</span>
        <img id="edit-medium-image" src="../img/board/equity_yellow.svg">
        </div>
        <div onfocus="addLowStatus()" onblur="removeLowStatus()" class="edit-prio-div" id="edit-low-div" tabindex="3">
        <span id="edit-low-span">Low</span>
        <img id="edit-low-image" src="../img/board/low-green.svg">
        </div>
        </div>
        </div>
        <div id="assigned-to-div" class="add-task-font-styling">
            <span class="add-task-font-styling">Assigned to</span>
            <div id="assigned-dropdown-div" onclick="toggleDropDownEdit()">
                <span class="add-task-font-styling-span">Select contacts to assign</span>
                <img id="drop-down-arrow" src="../img/add_task/arrow_drop_down.svg" >
            </div>
                <div id="drop-down-edit-content" class=" scrollbar-contacts-edit">
                </div>
            <div id="current-assigned-contacts" style="display:flex; padding-top: 6px">
            </div>          
        </div>
        <div class="edit-subtask-whole-container">
            <span class="edit-subtask-heading edit-headings-style" >Subtasks</span>
            <div class="edit-subtask-input-container">
                <input  id="edit-subtask-input" type="text" placeholder="Add new subtask">
                <img class="edit-subtask-plus-image cp"  onclick="editAddSubtask(${taskID})" src="../img/board/add_dark.svg">
            </div>
            <div class="edit-subtask-list-div">
                <ul id="edit-subtask-list">
                </ul>
            </div>
        </div>
     </div>
     <div class="place-button-div">
     <button type="submit" onclick="saveEditedChanges(${taskID})" id="change-task-button"><span>Ok</span><img src="../img/board/check.svg"></button>
     </div>
        </form  
        `;
}

/**
 * Generates HTML content for rendering detailed information about an open task.
 * @function renderOpenTaskDetailTemplate
 * @param {string} categoryBackgroundColor - The background color for the task category label.
 * @param {string} taskCategory - The category of the task.
 * @param {string} taskTitle - The title of the task.
 * @param {string} taskDescription - The description of the task.
 * @param {string} formattedDueDate - The formatted due date of the task.
 * @param {string} priorityInfoText - The text describing the priority of the task.
 * @param {string} priorityInfoImage - The URL to the image representing the task priority.
 * @param {string} taskID - The ID of the task.
 * @returns {string} - The HTML string representing the detailed task information.
 */
function renderOpenTaskDetailTemplate(
  categoryBackgroundColor,
  taskCategory,
  taskTitle,
  taskDescription,
  formattedDueDate,
  priorityInfoText,
  priorityInfoImage,
  taskID
) {
  return `
        <div id="head-detailview">
            <span class="category-taskdetail-style" style="background-color: ${categoryBackgroundColor};">${taskCategory}</span>
            <img src="../img/board/close.svg" class="close-button-taskdetail"  onclick="slideOut()">
        </div>
        <div class="taskdetail-middle-div">
        <span class="taskdetail-title-span">${taskTitle}</span>
        <span class="taskdetail-description-span">${taskDescription}</span>
        </div>
        <div class="taskdetail-dueDate-div">
        <span class="heading-detailviews-dueDate">Due Date:</span>
        <span class="rendered-information-taskdetail">${formattedDueDate}</span>
        </div>
        <div class="taskdetail-prio-div">
        <span class="heading-detailviews-inter blue-heading">Priority:</span>
        <div class="taskdetail-prio-text-img-div">
        <span class="heading-detailviews-inter">${priorityInfoText}</span>
        <img src="${priorityInfoImage}">
        </div>
        </div
        <div class="taskdetail-container-assignedContacts">
        <span class="heading-detailviews-inter blue-heading">Assigned To:</span>
        <div id="render-assigned-contacts" class="taskdetails-assignedContacts">
        </div>
        </div>
        <span class="heading-detailviews-inter blue-heading">Subtasks:</span>

        <div class="taskdetail-container-subtasks">
        <div id="render-taskdetails-subtasks" class="taskdetails-subtasks">
        </div>
        </div>
        <div class="interaction-buttons">
        <div onmouseenter="toggleDeleteImageOnHover()" onclick="deleteTask('${taskID}')" class="taskdetails-delete-div">
        <img id="delete-image" src="../img/board/delete.svg" class="taskdetail-interaction-buttons">
        <span class="taskdetails-button-bottom-spanstyle">Delete</span>
        </div>
        <span class="vertical-pipe">|</span>
        <div onmouseenter="toggleEditImageOnHover()" onclick="editTask('${taskID}')" class="taskdetails-edit-div">
        <img id="edit-image" src="../img/board/edit.svg"  class="taskdetail-interaction-buttons">
        <span class="taskdetails-button-bottom-spanstyle">Edit</span>
        </div>
        </div>
    `;
}

/**
 * Generates HTML content for rendering assigned task details in edit mode.
 * @function editAssignedTaskTemplate
 * @param {string} avatarColor - The background color for the user profile avatar.
 * @param {string} lastName - The last name of the assigned user.
 * @param {string} firstName - The first name of the assigned user.
 * @returns {string} - The HTML string representing the assigned task details.
 */
function editAssignedTaskTemplate(avatarColor, lastName, firstName) {
  return `
<div class="round-user-profile" style="background-color:${avatarColor}">
    <span class="assigned-testuser">${firstName}${lastName}</span>
</div>    
`;
}

/**
 * Generates HTML content for rendering assigned user details in the "To Do" category.
 * @function renderAssignedToDoTemplate
 * @param {string} avatarColor - The background color for the user profile avatar.
 * @param {string} firstName - The first name of the assigned user.
 * @param {string} lastName - The last name of the assigned user.
 * @returns {string} - The HTML string representing the assigned user details.
 */
function renderAssignedToDoTemplate(avatarColor, firstName, lastName) {
  return ` 
    <div class="round-user-profile" style="background-color:${avatarColor}">
    <span class="assigned-testuser">${firstName}${lastName}</span>
    </div>
  
    `;
}

/**
 * Generates HTML content for rendering a task in the "To Do" category.
 * @function renderToDoTemplate
 * @param {number} toDoTaskTaskID - The unique identifier for the task.
 * @param {string} categoryBackgroundColor - The background color for the task category.
 * @param {string} toDoTaskCategory - The category of the task.
 * @param {string} toDoTaskTitle - The title of the task.
 * @param {string} toDoTaskDescription - The description of the task.
 * @param {string} fillWidth - The width percentage of the task completion bar.
 * @param {number} doneSubtasksCount - The number of completed subtasks.
 * @param {number} totalSubtasksCount - The total number of subtasks.
 * @param {string} assignedContactsHTML - The HTML content representing assigned contacts.
 * @param {string} priorityImagePath - The path to the priority symbol image.
 * @returns {string} - The HTML string representing the task card.
 */
function renderToDoTemplate(
  toDoTaskTaskID,
  categoryBackgroundColor,
  toDoTaskCategory,
  toDoTaskTitle,
  toDoTaskDescription,
  fillWidth,
  doneSubtasksCount,
  totalSubtasksCount,
  assignedContactsHTML,
  priorityImagePath
) {
  return `
    <div draggable="true" ondragstart="startDragging(${toDoTaskTaskID})" onclick="openTaskDetail('${toDoTaskTaskID}')" class="card-for-task cursor-pointer">
       <div class="arrowHeader"> 
        <span class="task-category-span"  style="background-color: ${categoryBackgroundColor};">${toDoTaskCategory}
        </span>
        <img class="arrow-downward" src="../img/board/arrow_downward.svg" onclick="moveToInProgress('${toDoTaskTaskID}', event)">
       </div>
        <div class="task-board-div">
            <span class="task-heading-span">
                     ${toDoTaskTitle}
            </span>
            <span class="task-description-span">
                    ${toDoTaskDescription}
            </span>
        </div>
    <div id="subtasksDiv${toDoTaskTaskID}" class=board-subtask-div>
    <div class="balken">
        <div class="fuellung" style="width: ${fillWidth};">
        </div>
    </div>
    <div class="sub-span-subtask" onmouseover="showSubtaskDetails(${doneSubtasksCount}, ${totalSubtasksCount})">
        <span class="subtask-number-class">${doneSubtasksCount}
        </span>
        <span class="slash">
        /</span>
        <span class="total-numbers-subtask-class">${totalSubtasksCount}</span>
    </div>
    <div id="toastNotification" class="toast-notification"> </div>
    &nbsp;
    <span class="subtasks-span">Subtasks</span>
    </div>
    <div class="assigned-tasks-and-prio-div">
    <div id="assigned-users" class="assigned-users-div">
    ${assignedContactsHTML}
    </div>
    <div id="extraUsers${toDoTaskTaskID}">
    </div>
    <div class="priority-div-taskcard">
    <img class="priority-symbol-taskcard" src="${priorityImagePath}">
    </div>
    </div>
    </div>
    `;
}

/**
 * Generates HTML content for rendering an assigned user profile in the "In Progress" category.
 * @function renderAssignedInProgressTemplate
 * @param {string} avatarColor - The background color of the user's profile.
 * @param {string} firstName - The first name of the assigned user.
 * @param {string} lastName - The last name of the assigned user.
 * @returns {string} - The HTML string representing the assigned user profile.
 */
function renderAssignedInProgressTemplate(avatarColor, firstName, lastName) {
  return `
<div class="round-user-profile" style="background-color:${avatarColor}">
    <span class="assigned-testuser">${firstName}${lastName}</span>
</div>
`;
}

/**
 * Generates HTML content for rendering a task in the "In Progress" category.
 * @function renderInProgressTemplate
 * @param {number} inProgressTaskTaskID - The ID of the in-progress task.
 * @param {string} categoryBackgroundColor - The background color of the task category.
 * @param {string} inProgressTaskCategory - The category of the in-progress task.
 * @param {string} inProgressTaskTitle - The title of the in-progress task.
 * @param {string} inProgressTaskDescription - The description of the in-progress task.
 * @param {string} fillWidth - The width percentage representing task completion.
 * @param {number} doneSubtasksCount - The number of completed subtasks.
 * @param {number} totalSubtasksCount - The total number of subtasks.
 * @param {string} assignedContactsHTML - The HTML string representing assigned contacts.
 * @param {string} priorityImagePath - The path to the priority image for the task.
 * @returns {string} - The HTML string representing the rendered in-progress task.
 */
function renderInProgressTemplate(
  inProgressTaskTaskID,
  categoryBackgroundColor,
  inProgressTaskCategory,
  inProgressTaskTitle,
  inProgressTaskDescription,
  fillWidth,
  doneSubtasksCount,
  totalSubtasksCount,
  assignedContactsHTML,
  priorityImagePath
) {
  return `
<div draggable="true" ondragstart="startDragging(${inProgressTaskTaskID})" onclick="openTaskDetail('${inProgressTaskTaskID}')" class="card-for-task cursor-pointer">
  <div class="arrowHeader">
    <span class="task-category-span"  style="background-color: ${categoryBackgroundColor};">${inProgressTaskCategory}</span>
    <img class="arrow-downward" src="../img/board/arrow_downward.svg" onclick="moveToAwaitFeedback('${inProgressTaskTaskID}', event)">
    <img class="arrow-upward" src="../img/board/arrow_upward.svg" onclick="moveFromInProgress('${inProgressTaskTaskID}', event)">   
   </div> 
    <div class="task-board-div">
        <span class="task-heading-span">${inProgressTaskTitle}</span>
        <span class="task-description-span">${inProgressTaskDescription}</span>
    </div>
    <div id="subtasksDiv${inProgressTaskTaskID}" class="board-subtask-div">
        <div class="balken">
            <div class="fuellung" style="width: ${fillWidth};"></div>
        </div>
        <div class="sub-span-subtask" onmouseover="showSubtaskDetails(${doneSubtasksCount}, ${totalSubtasksCount})">
            <span class="subtask-number-class">${doneSubtasksCount}</span>
            <span class="slash">/</span>
            <span class="total-numbers-subtask-class">${totalSubtasksCount}</span>
        </div>
        &nbsp;
        <span class="subtasks-span">Subtasks</span>
    </div>
    <div class="assigned-tasks-and-prio-div">
        <div id="assigned-users" class="assigned-users-div">
            ${assignedContactsHTML}
        </div>
        <div id="extraUsers${inProgressTaskTaskID}">
        </div>
        <div class="priority-div-taskcard">
            <img class="priority-symbol-taskcard" src="${priorityImagePath}">
        </div>
    </div>
</div>
`;
}

/**
 * Generates HTML content for rendering an assigned contact in the "Await Feedback" category.
 * @function renderAssignedAwaitFeedbackTemplate
 * @param {string} firstName - The first name of the assigned contact.
 * @param {string} lastName - The last name of the assigned contact.
 * @param {string} avatarColor - The background color for the contact's avatar.
 * @returns {string} - The HTML string representing the rendered assigned contact.
 */
function renderAssignedAwaitFeedbackTemplate(firstName, lastName, avatarColor) {
  return `
<div class="round-user-profile" style="background-color:${avatarColor}">
    <span class="assigned-testuser">${firstName}${lastName}</span>
</div>
`;
}

/**
 * Generates HTML content for rendering a task in the "Await Feedback" category.
 * @function renderAwaitFeedbackTemplate
 * @param {number} awaitFeedbackTaskTaskID - The ID of the task.
 * @param {string} categoryBackgroundColor - The background color for the task category.
 * @param {string} awaitFeedbackTaskCategory - The category of the task.
 * @param {string} awaitFeedbackTaskTitle - The title of the task.
 * @param {string} awaitFeedbackTaskDescription - The description of the task.
 * @param {string} fillWidth - The width of the progress bar (fill).
 * @param {number} doneSubtasksCount - The count of completed subtasks.
 * @param {number} totalSubtasksCount - The total count of subtasks.
 * @param {string} assignedContactsHTML - The HTML content representing assigned contacts.
 * @param {string} priorityImagePath - The image path for the priority symbol.
 * @returns {string} - The HTML string representing the rendered task.
 */
function renderAwaitFeedbackTemplate(
  awaitFeedbackTaskTaskID,
  categoryBackgroundColor,
  awaitFeedbackTaskCategory,
  awaitFeedbackTaskTitle,
  awaitFeedbackTaskDescription,
  fillWidth,
  doneSubtasksCount,
  totalSubtasksCount,
  assignedContactsHTML,
  priorityImagePath
) {
  return `
<div draggable="true" ondragstart="startDragging(${awaitFeedbackTaskTaskID})" onclick="openTaskDetail('${awaitFeedbackTaskTaskID}')" class="card-for-task cursor-pointer">
  <div class="arrowHeader">
    <span class="task-category-span" style="background-color: ${categoryBackgroundColor};">${awaitFeedbackTaskCategory}</span>
    <img class="arrow-downward" src="../img/board/arrow_downward.svg" onclick="moveToDone('${awaitFeedbackTaskTaskID}', event)">
    <img class="arrow-upward" src="../img/board/arrow_upward.svg" onclick="moveFromAwaitFeedback('${awaitFeedbackTaskTaskID}', event)"> 
  </div>  
    <div class="task-board-div">
        <span class="task-heading-span">${awaitFeedbackTaskTitle}</span>
        <span class="task-description-span">${awaitFeedbackTaskDescription}</span>
    </div>
    <div id="subtasksDiv${awaitFeedbackTaskTaskID}" class="board-subtask-div">
        <div class="balken">
            <div class="fuellung" style="width: ${fillWidth};"></div>
        </div>
        <div class="sub-span-subtask" onmouseover="showSubtaskDetails(${doneSubtasksCount}, ${totalSubtasksCount})">
            <span class="subtask-number-class">${doneSubtasksCount}</span>
            <span class="slash">/</span>
            <span class="total-numbers-subtask-class">${totalSubtasksCount}</span>
        </div>
        &nbsp;
        <span class="subtasks-span">Subtasks</span>
    </div>
    <div class="assigned-tasks-and-prio-div">
        <div id="assigned-users" class="assigned-users-div">
            ${assignedContactsHTML}
        </div>
        <div id="extraUsers${awaitFeedbackTaskTaskID}">
        </div>
        <div class="priority-div-taskcard">
            <img class="priority-symbol-taskcard" src="${priorityImagePath}">
        </div>
    </div>
</div>
`;
}

/**
 * Generates HTML content for rendering assigned users in the "Done" category.
 * @function renderAssignedDoneTemplate
 * @param {string} avatarColor - The background color for the user avatar.
 * @param {string} firstName - The first name of the assigned user.
 * @param {string} lastName - The last name of the assigned user.
 * @returns {string} - The HTML string representing the rendered assigned user.
 */
function renderAssignedDoneTemplate(avatarColor, firstName, lastName) {
  return `
    <div class="round-user-profile" style="background-color:${avatarColor}">
        <span class="assigned-testuser">${firstName}${lastName}</span>
    </div>
`;
}

/**
 * Generates HTML content for rendering tasks in the "Done" category.
 * @function renderDoneTemplate
 * @param {number} doneTaskTaskID - The ID of the task.
 * @param {string} categoryBackgroundColor - The background color for the task category.
 * @param {string} doneTaskCategory - The category of the task.
 * @param {string} doneTaskTitle - The title of the task.
 * @param {string} doneTaskDescription - The description of the task.
 * @param {string} fillWidth - The width of the progress bar (subtasks completion).
 * @param {number} doneSubtasksCount - The count of completed subtasks.
 * @param {number} totalSubtasksCount - The total count of subtasks.
 * @param {string} assignedContactsHTML - The HTML content for assigned contacts.
 * @param {string} priorityImagePath - The path to the priority image for the task.
 * @returns {string} - The HTML string representing the rendered task.
 */
function renderDoneTemplate(
  doneTaskTaskID,
  categoryBackgroundColor,
  doneTaskCategory,
  doneTaskTitle,
  doneTaskDescription,
  fillWidth,
  doneSubtasksCount,
  totalSubtasksCount,
  assignedContactsHTML,
  priorityImagePath
) {
  return `
    <div draggable="true" ondragstart="startDragging(${doneTaskTaskID})" onclick="openTaskDetail('${doneTaskTaskID}')" class="card-for-task cursor-pointer">
    <div class="arrowHeader">
        <span class="task-category-span" style="background-color: ${categoryBackgroundColor};">${doneTaskCategory}</span>
        <img class="arrow-upward" src="../img/board/arrow_upward.svg" onclick="moveFromDone('${doneTaskTaskID}', event)"> 
        </div>
        <div class="task-board-div">
            <span class="task-heading-span">${doneTaskTitle}</span>
            <span class="task-description-span">${doneTaskDescription}</span>
        </div>
        <div id="subtasksDiv${doneTaskTaskID}" class="board-subtask-div">
            <div class="balken">
                <div class="fuellung" style="width: ${fillWidth};"></div>
            </div>
            <div class="sub-span-subtask" onmouseover="showSubtaskDetails(${doneSubtasksCount}, ${totalSubtasksCount})">
                <span class="subtask-number-class">${doneSubtasksCount}</span>
                <span class="slash">/</span>
                <span class="total-numbers-subtask-class">${totalSubtasksCount}</span>
            </div>
            &nbsp;
            <span class="subtasks-span">Subtasks</span>
        </div>
        <div class="assigned-tasks-and-prio-div">
            <div id="assigned-users" class="assigned-users-div">
                ${assignedContactsHTML}
            </div>
            <div id="extraUsers${doneTaskTaskID}">
            </div>
            <div class="priority-div-taskcard">
                <img class="priority-symbol-taskcard" src="${priorityImagePath}">
            </div>
        </div>
    </div>
`;
}

/**
 * Generates HTML content for rendering assigned users in task details.
 * @function taskDetailAssignedTemplate
 * @param {string} avatarColor - The background color for the user's avatar.
 * @param {string} firstName - The first name of the assigned user.
 * @param {string} lastName - The last name of the assigned user.
 * @param {string} userFirstName - The first name of the current user.
 * @param {string} userLastName - The last name of the current user.
 * @param {boolean} isCurrentUser - Indicates if the assigned user is the current user (true/false).
 * @returns {string} - The HTML string representing the rendered assigned user.
 */
function taskDetailAssignedTemplate(
  avatarColor,
  firstName,
  lastName,
  userFirstName,
  userLastName,
  isCurrentUser
) {
  return `
<div class="single-user-taskdetail"  tabindex="0" >
    <div class="round-user-profile" style="background-color:${avatarColor}">
        <span class="assigned-testuser">${firstName}${lastName}</span>
    </div>
    <span class="detailview-user">${userFirstName} ${userLastName}${isCurrentUser}</span>
</div>
`;
}

/**
 * Generates HTML content for rendering a subtask item in task details.
 * @function taskDetailSubtaskTemplate
 * @param {number} i - The index of the subtask.
 * @param {string} checkboxChecked - The attribute to indicate if the checkbox should be checked (e.g., 'checked' or '').
 * @param {number} taskID - The ID of the task associated with the subtask.
 * @param {string} subtaskDescription - The description of the subtask.
 * @returns {string} - The HTML string representing the rendered subtask item.
 */
function taskDetailSubtaskTemplate(
  i,
  checkboxChecked,
  taskID,
  subtaskDescription
) {
  return `
<div class="subtask-item">
    <input type="checkbox" class="subtask-checkbox" id="subtask-${i}" ${checkboxChecked} onclick="toggleSubtaskStatus(${taskID}, ${i}, this)" />
    <label for="subtask-${i}" class="subtask-label">${subtaskDescription}</label>
</div>
`;
}

/**
 * Generates HTML content for rendering a dropdown item in edit mode.
 * @function renderDropDownEditTemplate
 * @param {number} i - The index of the dropdown item.
 * @param {string} avatarColor - The background color for the avatar.
 * @param {string} firstName - The first name initials for the avatar.
 * @param {string} lastName - The last name initials for the avatar.
 * @param {string} contactFirstName - The first name of the contact.
 * @param {string} contactLastName - The last name of the contact.
 * @returns {string} - The HTML string representing the rendered dropdown item.
 */
function renderDropDownEditTemplate(
  i,
  avatarColor,
  firstName,
  lastName,
  contactFirstName,
  contactLastName
) {
  return `
    <label class="f-btw"  >
        <div class="dropdown-span-block">
            <span id="specificColor${i}" class="initials-dropdown-styling" style="background-color: ${avatarColor};">${firstName}${lastName}</span>
            <span>${contactFirstName} ${contactLastName}</span>
        </div>
        <input type="checkbox" data-contact-id="${i}" id="checkbox-${i}" onchange="toggleCheckboxEdit(${i})">
    </label>
`;
}

/**
 * Generates HTML content for filtering contacts in edit mode.
 * @function filterContactsEditTemplate
 * @param {number} i - The index of the contact item.
 * @param {string} avatarColor - The background color for the avatar.
 * @param {string} searchedFirstIni - The first initial of the searched contact.
 * @param {string} searchedSecondIni - The second initial of the searched contact.
 * @param {string} searchedFirstName - The first name of the searched contact.
 * @param {string} searchedLastName - The last name of the searched contact.
 * @returns {string} - The HTML string representing the rendered contact item for filtering.
 */
function filterContactsEditTemplate(
  i,
  avatarColor,
  searchedFirstIni,
  searchedSecondIni,
  searchedFirstName,
  searchedLastName
) {
  return `
<label class="f-btw" onclick="selectOption(${i})">
    <div class="dropdown-span-block">
        <span id="specificColor${i}" class="initials-dropdown-styling" style="background-color: ${avatarColor}">${searchedFirstIni}${searchedSecondIni}</span>
        <span>${searchedFirstName} ${searchedLastName}</span>
    </div>
    <input type="checkbox">
</label>
`;
}

/**
 * Generates HTML content to close a subtask edit template.
 * @function closeSubtaskEditTemplate
 * @param {number} subtaskID - The ID of the subtask.
 * @param {string} subtaskDescription - The description of the subtask.
 * @param {number} taskTaskID - The ID of the task associated with the subtask.
 * @returns {string} - The HTML string representing the rendered subtask item in edit mode.
 */
function closeSubtaskEditTemplate(subtaskID, subtaskDescription, taskTaskID) {
  return `  
<li  id="listelement-subtaskID${subtaskID}" onmouseover="showImages('${subtaskID}')" onmouseout="hideImages('${subtaskID}')" class="single-list-element">&#8226; ${subtaskDescription}
<div class="edit-subtast-edit-delete-div d-none" id="hover-box-edit${subtaskID}" >
<img class="edit-delete-image cp"" onclick="editsubtasks('${subtaskID}', '${subtaskDescription}', ${taskTaskID})" id="editST('${subtaskID}')" src="../img/board/edit.svg">
<span class="slash-edit">
|</span>
<img onclick="deleteCurrentSubtask(${taskTaskID}, ${subtaskID}, renderEditTaskView)"" class="edit-delete-image cp"" id="deleteST${subtaskID}" src="../img/board/delete.svg">
</div >
</li>   
`;
}

/**
 * Generates HTML content for editing a subtask.
 * @function editSubtaskTemplate
 * @param {string} subtaskDescription - The current description of the subtask.
 * @param {number} currentSupTaskID - The ID of the current parent task associated with the subtask.
 * @returns {string} - The HTML string representing the editable subtask template.
 */
function editSubtaskTemplate(
  subtaskDescription,
  currentSupTaskID,
  currentSupTaskID
) {
  return `
<input class="subtaskinput-edit" type="text" placeholder="${subtaskDescription}">
<div class="flex-edit-check-div">
<img src="../img/board/close.svg" onclick="closeCurrentSubtaskEdit(${currentSupTaskID})">
<span>|</span>
<img src="../img/board/check_black.svg" onclick="confirmCurrentSubtaskEdit(${currentSupTaskID})">
</div>
`;
}

/**
 * Generates HTML content for editing a task subtask.
 * @function editTaskSubtaskTemplate
 * @param {number} subtaskID - The ID of the subtask.
 * @param {string} subtaskDescription - The description of the subtask.
 * @param {number} taskID - The ID of the parent task associated with the subtask.
 * @returns {string} - The HTML string representing the editable task subtask template.
 */
function editTaskSubtaskTemplate(subtaskID, subtaskDescription, taskID) {
  return `
        <li  id="listelement-subtaskID${subtaskID}" onmouseover="showImages('${subtaskID}')" onmouseout="hideImages('${subtaskID}')" class="single-list-element">&#8226; ${subtaskDescription}
        <div class="edit-subtast-edit-delete-div d-none" id="hover-box-edit${subtaskID}" >
        <img class="edit-delete-image cp"" onclick="editsubtasks('${subtaskID}', '${subtaskDescription}', ${taskID})" id="editST('${subtaskID}')" src="../img/board/edit.svg">
        <span class="slash-edit">
        |</span>
        <img onclick="deleteCurrentSubtask(${taskID}, ${subtaskID}, renderEditTaskView)"" class="edit-delete-image cp"" id="deleteST${subtaskID}" src="../img/board/delete.svg">
        </div >
        </li>    
    `;
}

/**
 * Generates HTML template for additional users display.
 * @function addiotionalUsersHTMLTemplate
 * @param {string} additionalUsers - The number or label for additional users.
 * @returns {string} - The HTML string representing the template for additional users.
 */
function addiotionalUsersHTMLTemplate(additionalUsers) {
  return `
    <span>+&nbsp;${additionalUsers}</span>
    `;
}

/**
 * Generates the HTML template for displaying a chosen contact in the edit view.
 * This function creates an HTML string for a contact element, showing the contact's initials and background color.
 * @function renderChosenContactsEditHTMLTemplate
 * @param {number} index - The position of the contact in the list.
 * @param {string} contactavatarColor - The background color for the contact's avatar.
 * @param {string} contactini_first - The initial of the contact's first name.
 * @param {string} contactini_name - The initial of the contact's last name.
 * @returns {string} The HTML string for the contact element in the edit view.
 */
function renderChosenContactsEditHTMLTemplate(
  index,
  contactavatarColor,
  contactini_first,
  contactini_name
) {
  return `<span data-position="${index}" class="initials-dropdown-styling" 
    style="background-color: ${contactavatarColor};">${contactini_first}${contactini_name}</span>`;
}

/**
 * Generates the HTML template for displaying a chosen contact in the board overlay view.
 * This function creates an HTML string for a contact element, showing the contact's initials and background color.
 * @function renderChosenContactsBoardOverlayHTMLTemplate
 * @param {number} index - The position of the contact in the list.
 * @param {string} contactavatarColor - The background color for the contact's avatar.
 * @param {string} contactini_first - The initial of the contact's first name.
 * @param {string} contactini_name - The initial of the contact's last name.
 * @returns {string} The HTML string for the contact element in the board overlay view.
 */
function renderChosenContactsBoardOverlayHTMLTemplate(
  index,
  contactavatarColor,
  contactini_first,
  contactini_name
) {
  return `<span data-position="${index}" class="initials-dropdown-styling" 
    style="background-color: ${contactavatarColor};">${contactini_first}${contactini_name}</span>`;
}

/**
 * Generates the HTML template for displaying a new subtask in the board overlay view.
 * This function creates an HTML string for a subtask element, showing the subtask text and edit/delete icons.
 * @function addNewOverlaySubtaskHTMLTemplate
 * @param {string} createdSubtaskID - The unique identifier for the created subtask element.
 * @param {string} newSubtaskInput - The input text for the new subtask.
 * @returns {string} The HTML string for the new subtask element in the board overlay view.
 */
function addNewOverlaySubtaskHTMLTemplate(createdSubtaskID, newSubtaskInput) {
  return `
    <div id="${createdSubtaskID}" class="created-subtask-board-overlay-div-styling">
        <span>${newSubtaskInput}</span>
        <div  class="subtasks-images-before-hover">
            <img class="created-subtask-pencil-board-overlay-image" onclick="editCurrentAddTaskSubtaskBoardOverlay('${createdSubtaskID}')" src="../img/add_task/edit.svg">
            <img class="created-subtask-bin-board-overlay-image" onclick="deleteCurrentCreatedSubtaskBoardOverlay('${createdSubtaskID}')" src="../img/add_task/delete.svg">
        </div>
    </div>
`;
}

/**
 * Generates the HTML template for editing a subtask in the board overlay view.
 * This function creates an HTML string for an editable subtask element,
 * showing an input field with the current subtask text and save/cancel icons.
 * @function editCurrentAddTaskSubtaskBoardOverlayHTMLTemplate
 * @param {string} createdSubtaskID - The unique identifier for the subtask element being edited.
 * @param {string} subtaskText - The current text of the subtask being edited.
 * @returns {string} The HTML string for the editable subtask element in the board overlay view.
 */
function editCurrentAddTaskSubtaskBoardOverlayHTMLTemplate(
  createdSubtaskID,
  subtaskText
) {
  return `
<div id="${createdSubtaskID}" class="created-subtask-board-overlay-div-styling">
    <input type="text" value="${subtaskText}" class="subtask-input" />
    <div class="subtasks-images-before-hover">
        <img class="created-subtask-pencil-board-overlay-image" onclick="saveEditedSubtaskBoardOverlay('${createdSubtaskID}')" src="../img/add_task/check_mat.svg">
        <img class="created-subtask-pencil-board-overlay-image" onclick="cancelCurrentEditingSubtaskBoardOverlay('${createdSubtaskID}')" src="../img/add_task/cancel_image.svg">
    </div>
</div>
`;
}

/**
 * Generates the HTML template for saving an edited subtask in the board overlay view.
 * This function creates an HTML string for a saved subtask element,
 * showing the edited subtask text and edit/delete icons.
 * @function saveEditedSubtaskBoardOverlayHTMLTemplate
 * @param {string} createdSubtaskID - The unique identifier for the edited subtask element.
 * @param {string} editedSubtaskText - The edited text of the subtask.
 * @returns {string} The HTML string for the saved subtask element in the board overlay view.
 */
function saveEditedSubtaskBoardOverlayHTMLTemplate(
  createdSubtaskID,
  editedSubtaskText
) {
  return `
    <div id="${createdSubtaskID}" class="created-subtask-board-overlay-div-styling">
        <span>${editedSubtaskText}</span>
        <div class="subtasks-images-before-hover">
            <img class="created-subtask-pencil-board-overlay-image" onclick="editCurrentAddTaskSubtaskBoardOverlay('${createdSubtaskID}')" src="../img/add_task/edit.svg">
            <img class="created-subtask-pencil-board-overlay-image" onclick="deleteCurrentCreatedSubtaskBoardOverlay('${createdSubtaskID}')" src="../img/add_task/delete.svg">
        </div>
    </div>
`;
}

/**
 * Generates the HTML template for canceling the editing of a subtask in the board overlay view.
 * This function creates an HTML string for a subtask element,
 * showing the original subtask text and edit/delete icons.
 * @function cancelCurrentEditingSubtaskBoardOverlayHTMLTemplate
 * @param {string} createdSubtaskID - The unique identifier for the subtask element.
 * @param {string} originalSubtaskText - The original text of the subtask before editing.
 * @returns {string} The HTML string for the subtask element with original text in the board overlay view.
 */
function cancelCurrentEditingSubtaskBoardOverlayHTMLTemplate(
  createdSubtaskID,
  originalSubtaskText
) {
  return `
<div id="${createdSubtaskID}" class="created-subtask-board-overlay-div-styling">
<span>${originalSubtaskText}</span>
<div class="subtasks-images-before-hover">
    <img class="created-subtask-pencil-board-overlay-image" onclick="editCurrentAddTaskSubtaskBoardOverlay('${createdSubtaskID}')" src="../img/add_task/edit.svg">
    <img class="created-subtask-pencil-board-overlay-image" onclick="deleteCurrentCreatedSubtaskBoardOverlay('${createdSubtaskID}')" src="../img/add_task/delete.svg">
</div>
</div>
`;
}