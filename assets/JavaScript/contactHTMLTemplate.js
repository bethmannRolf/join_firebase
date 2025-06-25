/**
 * Generates HTML template for displaying contact information.
 * @param {Object} contact - The contact object containing contact information.
 * @param {string} contact.avatarColor - The color of the avatar.
 * @param {string} contact.firstname - The first name of the contact.
 * @param {string} contact.name - The last name of the contact.
 * @param {string} contact.id - The unique identifier of the contact.
 * @param {string} contact.email - The email address of the contact.
 * @param {string} contact.phoneNumber - The phone number of the contact.
 * @returns {string} HTML template string for displaying contact information.
 */
function showContactInfoTemplate(contact) {
    return `
      <div class="current-contact">
        <div class="userprofil-top d-flex">
          <div>
          <svg class="current-userprofil" width="120" height="120" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="21" cy="21" r="20" fill=${contact.avatarColor} stroke="white" stroke-width="2"/>
            <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-size="12" font-family="Inter, sans-serif" font-weight="400" fill="white">
              ${contact["firstname"].charAt(0) + contact["name"].charAt(0)}
            </text>
          </svg>
          </div>

          <div class="userprofil-top-right-side">
            <div class="current-name">${contact["firstname"]} ${contact["name"]}</div>
            <div class="edit-and-delete d-flex">
              <div onclick="editCurrentContact(${contact.id})" class="edit"><img id="editIcon" src="../img/edit.svg" alt=""> <span>Edit</span></div>
              <div onclick="deleteCurrentContact(${contact.id})" id="delete" class="delete"><img id="deleteIcon" src="../img/delete.svg" alt=""> <span>Delete</span></div>
            </div>
          </div>
        </div>

        <div class="contact-info"><span>Contact Information</span></div>

        <div class="email-and-phone">
          <span><b>Email</b></span>
          <a class="emailLink" href="#">${contact.email}</a>
          <span><b>Phone</b></span>
          <div>${contact.phoneNumber}</div>
        </div>
      </div>
  `
}

function showContactList(j, initials, i, avatarColor, userProfilInitials, contactfirstname, contactname, contactemail) {
  return `
  <div onclick="showContactInfo(${j}, '${initials[i]}')" class="d-flex">
    <div id="svg-userProfil">
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="21" cy="21" r="20" fill=${avatarColor} stroke="white" stroke-width="2"/>
        <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-size="12" font-family="Inter, sans-serif" font-weight="400" fill="white">
          ${userProfilInitials}
        </text>
      </svg>
    </div>
  
    <div class="contact">
      ${contactfirstname} ${contactname} <br>
      <a class="emailLink" href="#">${contactemail}</a>
    </div>
  </div>
`
}

function showCurrentContactCircle(formatedInitials, formatedColor) {
  return `
  <svg width="120" height="120" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="21" cy="21" r="20" fill="${formatedColor}" stroke="white" stroke-width="2"/>
    <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-size="12" font-family="Inter, sans-serif" font-weight="400" fill="white">
     ${formatedInitials}
    </text>
  </svg>`
}

function showCurrentContactCircleMobile(formatedInitials, formatedColor) {
  return`
  <svg width="120" height="120" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="21" cy="21" r="20" fill="${formatedColor}" stroke="white" stroke-width="2"/>
    <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-size="12" font-family="Inter, sans-serif" font-weight="400" fill="white">
      ${formatedInitials}
    </text>
  </svg>`
}