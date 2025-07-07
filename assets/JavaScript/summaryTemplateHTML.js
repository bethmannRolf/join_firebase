/**
 * Generates HTML content for greeting the user.
 * @function greetUserHTMLTemplate
 * @param {string} greeting - The greeting message (e.g., "Good morning", "Hello").
 * @param {string} currentUser - The username of the current user to be greeted.
 * @returns {string} - The HTML string representing the greeting template.
 */
function greetUserHTMLTemplate(greeting, currentUser) {
  return `
  <span id="greeting-with-daytime">${greeting},</span>
  <span id="greeting-username">  
  ${currentUser}
  </span>
  `
}

/**
 * Generates HTML template for displaying the count of To-do items.
 * 
 * @param {number} numberOfToDos - The number of To-do items to display.
 * @returns {string} The HTML template string representing the count of To-do items.
 */
function countToDosHTMLTemplate(numberOfToDos) {
  return `
<span id="amount-of-to-do">${numberOfToDos}</span>
<span id="to-do-span">To-do</span>
`
}

/**
 * Generates HTML content to display the number of completed tasks.
 * @function countDoneTasksHTMLTemplate
 * @param {number} numberOfDoneTasks - The number of tasks that are completed.
 * @returns {string} - The HTML string representing the completed tasks count template.
 */
function countDoneTasksHTMLTemplate(numberOfDoneTasks) {
  return `
<span id="summary-amount-done">${numberOfDoneTasks}</span>
<span id="summary-done-span">Done</span>
`
}

/**
 * Generates HTML content to display the number of tasks in progress.
 * @function countInProgressTasksHTMLTemplate
 * @param {number} numberOfInProgressTasks - The number of tasks that are in progress.
 * @returns {string} - The HTML string representing the in progress tasks count template.
 */
function countInProgressTasksHTMLTemplate(numberOfInProgressTasks) {
  return `
<span class="third-line-number-style" id="summary-amount-progress">${numberOfInProgressTasks}</span>
<span class="third-line-span-style" id="summary-task-progress-span">Tasks in Progress</span>
`
}

/**
 * Generates HTML content to display the number of tasks awaiting feedback.
 * @function countAwaitingFeedbackTasksHTMLTemplate
 * @param {number} numberOfAwaitingFeedbackTasks - The number of tasks awaiting feedback.
 * @returns {string} - The HTML string representing the awaiting feedback tasks count template.
 */
function countAwaitingFeedbackTasksHTMLTemplate(numberOfAwaitingFeedbackTasks) {
  return `
<span class="third-line-number-style" id="summary-awaiting-feedback-number">${numberOfAwaitingFeedbackTasks}</span>
<span class="third-line-span-style" id="summary-awaiting-feedback-span">Awaiting Feedback</span>
`
}

/**
 * Generates HTML content to display the total number of tasks in the board.
 * @function countAllTasksHTMLTemplate
 * @param {number} totalTasks - The total number of tasks in the board.
 * @returns {string} - The HTML string representing the total tasks count template.
 */
function countAllTasksHTMLTemplate(totalTasks) {
  return `
    <span class="third-line-number-style" id="summary-amount-tasks">${totalTasks}</span>
    <span class="third-line-span-style" id="summary-number-tasks-span">Tasks in Board</span>
    `
}

/**
 * Generates HTML content to display the total number of urgent priority tasks.
 * @function countPrioUrgentTemplateHTML
 * @param {number} totalPriorityZeroTasks - The total number of urgent priority tasks.
 * @returns {string} - The HTML string representing the urgent priority tasks count template.
 */
function countPrioUrgentTemplateHTML(totalPriorityZeroTasks) {
  return `
    <span id="summary-amount-urgent">${totalPriorityZeroTasks}</span>
    <span id="summary-urgent-span">Urgent</span>
    `
}

/**
 * Generates HTML content to display the closest due date or placeholder if no due date is available.
 * @function generateDeadlineHTML
 * @param {Date | null} closestDueDate - The closest due date or null if no due date is available.
 * @returns {string} - The HTML string representing the formatted closest due date or a placeholder.
 */
function generateDeadlineHTML(closestDueDate) {
  if (closestDueDate) {
    return `
        <span id="date-deadline">${formatDate(closestDueDate)}</span>
        <span id="summary-deadline-span">Upcoming Deadline</span>
      `;
  } else {
    return `<span id="date-deadline">- - -</span>
      <span id="summary-deadline-span">Upcoming Deadline</span>
      `;
  }
}