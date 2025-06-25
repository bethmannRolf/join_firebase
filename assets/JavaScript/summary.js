/**
 * Initializes additional functions when the page loads.
 * Calls several functions related to board functionality.
 * @function additionalFunctionsOnload
 * @returns {void}
 */
function additionalFunctionsOnload() {
  greetUser();
  countToDos();
  countDoneTasks();
  countInProgressTasks();
  countAwaitingFeedbackTasks();
  countAllTasks();
  countPriorityZeroTasks();
  findClosestDueDatePrioZero();
}

/**
 * Redirects the user to the board page.
 * This function opens the "board.html" page in the same window/tab.
 * @function redirectToBoard
 * @returns {void}
 */
function redirectToBoard() {
  window.open("board.html", "_self");
}

/**
 * Highlights the first div by adding specific CSS classes to certain elements.
 * This function modifies the appearance of various elements on the page to highlight the first div.
 * @function highlightFirstDiv
 *  @returns {void}
 */
function highlightFirstDiv() { 
  document.getElementById("first-line-left-div").classList.add("darken-div");
  changePencilHhover();
  document.getElementById("summary-pencil-image").classList.add("on-hover-pencil");
  document.getElementById("amount-of-to-do").classList.add("color-white");
  document.getElementById("to-do-span").classList.add("color-white");
}

/**
 * Toggles the highlighting of the first div by modifying CSS classes of certain elements.
 * This function toggles the appearance of various elements on the page related to the first div.
 * @function delightFirstDiv
 * @returns {void}
 */
function delightFirstDiv() { 
  document.getElementById("first-line-left-div").classList.toggle("darken-div");
  changePencilDishover();
  document.getElementById("amount-of-to-do").classList.remove("color-white");
  document.getElementById("to-do-span").classList.remove("color-white");
}

/**
 * Changes the appearance of a pencil image to white when hovered over.
 * This function modifies the source (src) attribute of the pencil image element to a white version when hovered over.
 * @function changePencilHhover
 * @returns {void}
 */
function changePencilHhover() { 
  let pencilOnHover = document.getElementById("summary-pencil-image");
  pencilOnHover.src = "../img/summary/summary_pencil_image_white.svg";
}

/**
 * Changes the appearance of a pencil image back to its default when not hovered over.
 * This function modifies the source (src) attribute of the pencil image element back to its default version when not hovered over.
 * @function changePencilDishover
 * @returns {void}
 */
function changePencilDishover() { 
  let pencilOnDishover = document.getElementById("summary-pencil-image");
  pencilOnDishover.src = "../img/summary/summary_pencil_image.png";
}

/**
 * Highlights the second div by adding specific CSS classes to certain elements.
 * This function modifies the appearance of various elements on the page to highlight the second div.
 * @function highlightSecondDiv
 * @returns {void}
 */
function highlightSecondDiv() { 
  document.getElementById("first-line-right-div").classList.add("darken-div");
  document.getElementById("summary-amount-done").classList.add("color-white");
  document.getElementById("summary-done-span").classList.add("color-white");
  changeCheckHover();
}

/**
 * Removes highlighting from the second div by modifying CSS classes of certain elements.
 * This function modifies the appearance of various elements on the page to remove highlighting from the second div.
 * @function delightSecondDiv
 * @returns {void}
 */
function delightSecondDiv() { 
  changeCheckDishover(); 
  document.getElementById("first-line-right-div").classList.remove("darken-div");
  document.getElementById("summary-amount-done").classList.remove("color-white");
  document.getElementById("summary-done-span").classList.remove("color-white");
}

/**
 * Changes the appearance of a checkmark image to white when hovered over.
 * This function modifies the source (src) attribute of the checkmark image element to a white version when hovered over.
 * @function changeCheckHover
 * @returns {void}
 */
function changeCheckHover() { 
  let checkOnHover = document.getElementById("summary-check-image");
  checkOnHover.src = "../img/summary/summary_check_white.svg";
}

/**
 * Changes the appearance of a checkmark image back to its default when not hovered over.
 * This function modifies the source (src) attribute of the checkmark image element back to its default version when not hovered over.
 * @function changeCheckDishover
 * @returns {void}
 */
function changeCheckDishover() { 
  let checkOnDishover = document.getElementById("summary-check-image");
  checkOnDishover.src = "../img/summary/summary_check.svg";
}

/**
 * Highlights the second line by adding specific CSS classes to certain elements.
 * This function modifies the appearance of various elements on the page to highlight the second line.
 * @function highlightSecondLine
 * @returns {void}
 */
function highlightSecondLine() { 
  document.getElementById("left-second-line").classList.add("darken-div");
  document.getElementById("summary-amount-urgent").classList.add("color-white");
  document.getElementById("summary-urgent-span").classList.add("color-white");
  document.getElementById("second-line-seperateline-div").classList.add("background-white");
  document.getElementById("date-deadline").classList.add("color-white");
  document.getElementById("summary-deadline-span").classList.add("color-white");
}

/**
 * Removes highlighting from the second line by removing specific CSS classes from certain elements.
 * This function modifies the appearance of various elements on the page to remove highlighting from the second line.
 * @function delightSecondLine
 * @returns {void}
 */
function delightSecondLine() { 
  document.getElementById("left-second-line").classList.remove("darken-div");
  document.getElementById("summary-amount-urgent").classList.remove("color-white");
  document.getElementById("summary-urgent-span").classList.remove("color-white");
  document.getElementById("second-line-seperateline-div").classList.remove("background-white");
  document.getElementById("date-deadline").classList.remove("color-white");
  document.getElementById("summary-deadline-span").classList.remove("color-white");
}

/**
 * Greets the user based on the current time of day.
 * This function dynamically generates a greeting message based on the current hour of the day.
 * The greeting message is then displayed on the web page.
 * @function greetUser
 * @returns {void}
 */
function greetUser() { 
  let currentDate = new Date();
  let currentHour = currentDate.getHours();
  let greeting;
  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Welcome";
  } else {
    greeting = "Good Evening";
  }
  document.getElementById("right-lower-main").innerHTML = "";
  document.getElementById("right-lower-main").innerHTML = greetUserHTMLTemplate(greeting, currentUser);
}

/**
 * Counts and displays the number of to-do tasks on the board.
 * This function retrieves the to-do tasks from the data source, counts them,
 * and then updates the webpage to display the count.
 * @function countToDos
 * @returns {void}
 */
function countToDos() { 
  let toDoTasks = contactData[0].tasks[0].toDo;
  let numberOfToDos = toDoTasks.length;
  document.getElementById("summary-to-do-div").innerHTML = "";
  document.getElementById("summary-to-do-div").innerHTML = countToDosHTMLTemplate(numberOfToDos);
}

/**
 * Counts and displays the number of completed tasks on the board.
 * This function retrieves the completed tasks from the data source, counts them,
 * and then updates the webpage to display the count.
 * @function countDoneTasks
 * @returns {void}
 */
function countDoneTasks() { 
  let doneTasks = contactData[0].tasks[0].done;
  let numberOfDoneTasks = doneTasks.length;
  document.getElementById("summary-done-div").innerHTML = "";
  document.getElementById("summary-done-div").innerHTML = countDoneTasksHTMLTemplate(numberOfDoneTasks);
}

/**
 * Counts and displays the number of tasks in progress on the board.
 * This function retrieves the tasks in progress from the data source, counts them,
 * and then updates the webpage to display the count.
 * @function countInProgressTasks
 * @returns {void}
 */
function countInProgressTasks() { 
  let inProgressTasks = contactData[0].tasks[0].inProgress;
  let numberOfInProgressTasks = inProgressTasks.length;
  document.getElementById("third-line-middle-div").innerHTML = "";
  document.getElementById("third-line-middle-div").innerHTML = countInProgressTasksHTMLTemplate(numberOfInProgressTasks);
}

/**
 * Counts and displays the number of tasks awaiting feedback on the board.
 * This function retrieves the tasks awaiting feedback from the data source, counts them,
 * and then updates the webpage to display the count.
 * @function countAwaitingFeedbackTasks
 * @returns {void}
 */
function countAwaitingFeedbackTasks() { 
  let awaitFeedbackTasks = contactData[0].tasks[0].awaitFeedback;
  let numberOfAwaitingFeedbackTasks = awaitFeedbackTasks.length;
  document.getElementById("third-line-right-div").innerHTML = "";
  document.getElementById("third-line-right-div").innerHTML = countAwaitingFeedbackTasksHTMLTemplate(numberOfAwaitingFeedbackTasks);
}

/**
 * Counts and displays the total number of tasks across all categories on the board.
 * This function retrieves tasks from different categories (to-do, in progress, awaiting feedback, done),
 * counts them, and then updates the webpage to display the total count.
 * @function countAllTasks
 * @returns {void}
 */
function countAllTasks() { 
  let toDoTasks = contactData[0].tasks[0].toDo;
  let inProgressTasks = contactData[0].tasks[0].inProgress;
  let awaitFeedbackTasks = contactData[0].tasks[0].awaitFeedback;
  let doneTasks = contactData[0].tasks[0].done;
  let totalTasks =
    toDoTasks.length +
    inProgressTasks.length +
    awaitFeedbackTasks.length +
    doneTasks.length;
  document.getElementById("third-line-left-div").innerHTML = "";
  document.getElementById("third-line-left-div").innerHTML = countAllTasksHTMLTemplate(totalTasks);
}

/**
 * Counts and updates the total number of tasks with priority zero (highest priority) on the board.
 * This function filters tasks with priority zero from different categories (to-do, in progress, awaiting feedback, done),
 * calculates the total count, and then updates the webpage to display the count.
 * @function countPriorityZeroTasks
 * @returns {void}
 */
function countPriorityZeroTasks() { //kurz genug
  let toDoTasks = filterTasksByPriority(contactData[0].tasks[0].toDo, 0);
  let inProgressTasks = filterTasksByPriority(contactData[0].tasks[0].inProgress, 0);
  let awaitFeedbackTasks = filterTasksByPriority(contactData[0].tasks[0].awaitFeedback, 0);
  let doneTasks = filterTasksByPriority(contactData[0].tasks[0].done, 0);
  let totalPriorityZeroTasks = calculateTotalPriorityZeroTasks(toDoTasks, inProgressTasks, awaitFeedbackTasks, doneTasks);
  updateSummaryUrgentRight(totalPriorityZeroTasks);
}

/**
 * Filters tasks based on priority level.
 * This function takes an array of tasks and filters out tasks that match the specified priority level.
 * @function filterTasksByPriority
 * @param {Array} tasks - An array of tasks to filter.
 * @param {number} priority - The priority level to filter tasks by.
 * @returns {Array} - An array containing tasks that match the specified priority level.
 */
function filterTasksByPriority(tasks, priority) {
  return tasks.filter(task => task.prio === priority);
}

/**
 * Calculates the total number of tasks with priority zero (highest priority) across different categories.
 * This function sums up the counts of priority zero tasks from different task categories (to-do, in progress, awaiting feedback, done).
 * @function calculateTotalPriorityZeroTasks
 * @param {Array} toDoTasks - An array of to-do tasks.
 * @param {Array} inProgressTasks - An array of tasks in progress.
 * @param {Array} awaitFeedbackTasks - An array of tasks awaiting feedback.
 * @param {Array} doneTasks - An array of completed tasks.
 * @returns {number} - The total count of tasks with priority zero across all categories.
 */
function calculateTotalPriorityZeroTasks(toDoTasks, inProgressTasks, awaitFeedbackTasks, doneTasks) { 
  return toDoTasks.length + inProgressTasks.length + awaitFeedbackTasks.length + doneTasks.length;
}

/**
 * Updates the summary section on the right side of the webpage with the count of urgent tasks.
 * This function updates the specified HTML element with the count of urgent tasks and its corresponding template.
 * @function updateSummaryUrgentRight
 * @param {number} totalPriorityZeroTasks - The total count of tasks with priority zero (urgent tasks).
 * @returns {void}
 */
function updateSummaryUrgentRight(totalPriorityZeroTasks) {
  let summaryUrgentRightElement = document.getElementById("summary-urgent-right");
  summaryUrgentRightElement.innerHTML = "";
  summaryUrgentRightElement.innerHTML = countPrioUrgentTemplateHTML(totalPriorityZeroTasks);
}

/**
 * Formats a given date string into a localized date format.
 * This function takes a date string, converts it into a Date object, and then formats it
 * into a localized date string using the specified options (year, month, day).
 * @function formatDate
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} - The formatted date string in the specified localized format.
 */
function formatDate(dateString) { 
  let options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

/**
 * Filters a list of tasks to include only tasks with priority zero.
 * This function takes an array of tasks and filters out tasks that have priority zero.
 * @function filterTasksByPriorityZero
 * @param {Array} taskList - An array of tasks to be filtered.
 * @returns {Array} - An array containing tasks with priority zero.
 */
function filterTasksByPriorityZero(taskList) {
  return taskList.filter((task) => task.prio === 0);
}

/**
 * Merges multiple task lists into a single array.
 * This function takes multiple arrays of tasks and merges them into a single array.
 * @function mergeTaskLists
 * @param {...Array} taskLists - Arrays of tasks to be merged.
 * @returns {Array} - A single array containing all tasks from the merged lists.
 */
function mergeTaskLists(...taskLists) { 
  return taskLists.reduce((acc, curr) => acc.concat(curr), []);
}

/**
 * Finds the closest due date among a list of tasks.
 * This function iterates through a list of tasks and identifies the due date that is closest to the current date.
 * @function findClosestDueDate
 * @param {Array} tasks - An array of tasks containing due dates.
 * @returns {Date|null} - The closest due date as a Date object, or null if no tasks are provided.
 */
function findClosestDueDate(tasks) { 
  let currentDate = new Date();
  let closestDueDate = null;
  let closestDiff = Infinity;
  tasks.forEach((task) => {
    let dueDate = new Date(task.dueDate);
    let timeDiff = Math.abs(dueDate - currentDate);
    if (timeDiff < closestDiff) {
      closestDiff = timeDiff;
      closestDueDate = dueDate;
    }
  });
  return closestDueDate;
}

/**
 * Displays the closest due date on a specified HTML element.
 * This function generates HTML content representing the closest due date and updates
 * the specified HTML element with this content.
 * @function displayClosestDueDate
 * @param {HTMLElement} deadlineElement - The HTML element where the closest due date will be displayed.
 * @param {Date|null} closestDueDate - The closest due date to display, or null if no due date is available.
 * @returns {void}
 */
function displayClosestDueDate(deadlineElement, closestDueDate) {
  let htmlString = generateDeadlineHTML(closestDueDate);
  deadlineElement.innerHTML = htmlString;
}

/**
 * Finds and displays the closest due date among tasks with priority zero (highest priority).
 * This function filters tasks with priority zero from different categories, merges them into a single list,
 * and then identifies the closest due date from these tasks to display on a specified HTML element.
 * @function findClosestDueDatePrioZero
 * @returns {void}
 */
function findClosestDueDatePrioZero() {
  let contactTasks = contactData[0].tasks[0];
  let toDoTasks = filterTasksByPriorityZero(contactTasks.toDo);
  let inProgressTasks = filterTasksByPriorityZero(contactTasks.inProgress);
  let awaitFeedbackTasks = filterTasksByPriorityZero(contactTasks.awaitFeedback);
  let doneTasks = filterTasksByPriorityZero(contactTasks.done);
  let allPrioZeroTasks = mergeTaskLists(toDoTasks, inProgressTasks, awaitFeedbackTasks, doneTasks);
  let closestDueDate = findClosestDueDate(allPrioZeroTasks);
  let deadlineElement = document.getElementById("second-line-right-div");
  displayClosestDueDate(deadlineElement, closestDueDate);
}

/**
 * Updates the content of the 'second-line-right-div' HTML element with the upcoming deadline information.
 * This function formats the closest due date, generates HTML content using a template, and updates
 * the specified HTML element with this content.
 * @function updateSecondLineRightDiv
 * @param {Date} closestDueDate - The closest due date to display.
 * @returns {void}
 */
function updateSecondLineRightDiv(closestDueDate) {
  let secondLineRightDiv = document.getElementById("second-line-right-div");
  secondLineRightDiv.innerHTML = '';
  secondLineRightDiv.innerHTML = upcomingDeadlineHTMLTemplate(formatDate(closestDueDate));
}

/**
 * Initializes user-related tasks and UI elements when the user session starts.
 * This function asynchronously includes HTML content, saves user tasks to the server,
 * retrieves global user data, retrieves user-specific data, initializes navigation bar highlighting,
 * retrieves and displays the user logo, and greets the user if the relevant HTML element exists.
 * @function initUser
 * @returns {void}
 */
async function initUser() {
  await includeHTML();
  await saveUserTasksToServer();
  await getGlobalUserData();
  await getUser();
  initNavbarHighlight();
  getUserLogo();
  if (document.getElementById("right-lower-main") !== null) {
    greetUser();
  }
}

/**
 * Retrieves user-specific data and updates the current user information.
 * This function retrieves the user data from the contactData array,
 * extracts the user name, and adds it to the current user information array.
 * Any errors that occur during this process are logged to the console.
 * @function getUser
 * @returns {void}
 */
async function getUser() { 
  try {
    let currentUserData = contactData[0];
    currentUser.push(currentUserData.userName);
  } catch (e) {
    console.error('Loading error:', e);
  }
}

/**
 * Retrieves and displays the user profile logo based on the current user.
 * This function generates initials for the user profile logo and updates the HTML content
 * of the 'header-userprofile' element with the generated initials.
 * If the current user is not a guest, their initials are displayed; otherwise, generic initials are displayed.
 * @function getUserLogo
 * @returns {void}
 */

function getUserLogo() { 
  let initials = getInitialsOnLogo(currentUser); 
  let displayInitials = initials.toUpperCase(); 
  if (currentUser !== 'Guest') {
    document.getElementById("header-userprofile").innerHTML = `<p>${displayInitials}</p>`;
  } else {
    document.getElementById("header-userprofile").innerHTML = `<p>${displayInitials}</p>`;
  }
}

/**
 * Generates initials for the user profile logo based on the current user's name.
 * This function extracts initials from the user's name and assigns them to the global variable 'initials'.
 * If the user's name contains a space (indicating a full name), the initials are derived from each word;
 * otherwise, the first two characters of the name are used as initials.
 * @function getInitialsOnLogo
 * @param {string} currentUser
 * @returns {string}
 */
function getInitialsOnLogo(currentUser) { 
  if (currentUser[0].includes(' ')) {
    initials = currentUser[0].split(' ').map(word => word.charAt(0)).join('');
  } else {
    initials = currentUser[0].toUpperCase().slice(0, 2);
  }
  return initials.toUpperCase();
}

/**
 * Clears user-related data and navigates the user to the index.html page.
 * This function is used to clear user-specific data and redirect the user to the homepage.
 * @function clearUser
 * @returns {void}
 */
async function clearUser() {
  window.open("index.html", "_self");
}

/**
 * Initializes navigation bar highlighting based on the current page URL.
 * This function determines the current page URL, identifies the corresponding navigation bar element,
 * adds an 'active' class to highlight the element, and optionally calls additional functions based on the URL.
 * @function initNavbarHighlight
 * @returns {void}
 */
function initNavbarHighlight() { 
  let whereIAM = window.location.pathname;
  let elementId = getNavbarElementId(whereIAM);
  if (elementId) {
    addActiveClass(elementId);
    callAdditionalFunctionsIfNecessary(whereIAM);
  }
}

/**
 * Retrieves the ID of the navigation bar element corresponding to a given URL.
 * This function maps specific URLs to their corresponding navigation bar element IDs.
 * @function getNavbarElementId
 * @param {string} url - The URL for which to retrieve the navigation bar element ID.
 * @returns {string | undefined} - The ID of the navigation bar element, or undefined if no matching ID is found.
 */
function getNavbarElementId(url) { 
  let urlMappings = {
    "/Join/assets/templates/summary.html": "summary-list-element",
    "/assets/templates/summary.html": "summary-list-element",
    "/Join/assets/templates/add_task_n_include.html": "addTask-list-element",
    "/assets/templates/add_task_n_include.html": "addTask-list-element",
    "/Join/assets/templates/board.html": "board-list-element",
    "/assets/templates/board.html": "board-list-element",
    "/Join/assets/templates/contacts.html": "contacts-list-element",
    "/assets/templates/contacts.html": "contacts-list-element",
    "/Join/assets/templates/privacyPolicy.html": "privacy-list-element",
    "/assets/templates/privacyPolicy.html": "privacy-list-element",
    "/Join/assets/templates/legalNotice.html": "legalNotice-list-element",
    "/assets/templates/legalNotice.html": "legalNotice-list-element"
  };
  return urlMappings[url];
}

/**
 * Adds an 'active' class to a specified HTML element.
 * This function retrieves the HTML element using its ID and adds the 'active' class to it,
 * highlighting the element in the user interface.
 * @function addActiveClass
 * @param {string} elementId - The ID of the HTML element to which the 'active' class will be added.
 * @returns {void}
 */
function addActiveClass(elementId) { 
  let element = document.getElementById(elementId);
  if (element) {
    element.classList.add("active");
  }
}

/**
 * Calls additional functions based on the specified URL if necessary.
 * This function checks if additional functions need to be called based on a specific URL.
 * If the URL matches a predefined condition, certain additional functions are invoked.
 * @function callAdditionalFunctionsIfNecessary
 * @param {string} url - The URL to check against predefined conditions.
 * @returns {void}
 */
function callAdditionalFunctionsIfNecessary(url) {
  if (url === "/Join/assets/templates/summary.html" || url === "/assets/templates/summary.html") {
    additionalFunctionsOnload();

  }
}