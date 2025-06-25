let users = [];


/**
 * In this function we try to get the users data from the backend and push them into the users array.
 * 
 */
async function loadUsers(){ // kurz genug
    try {
        users = JSON.parse(await getItem('users'));
        // console.log(users);
    } catch(e){
        console.error('Loading error:', e);
    }
}

/**
 * This function check if both input fields has the same password.
 * 
 */
async function registerUser() { // kurz genug
    if (password.value !== confirmPassword.value) {
        missmatchPassword();
    } else {
        if (checkbox !== true) {
            alert('Please accept the Privacy Policy!');
        } else {
             await successfullRegistrated();
        }
    }
}

/**
 * This function appears if the passwords of the input fields are wrong.
 * 
 */
function missmatchPassword() { // kurz genug
    password.style.border = '2px solid red';
    confirmPassword.style.border = '2px solid red';
    document.getElementById("passwordNotMatch").classList.remove("d-none");
    PPContainer.style.bottom = '92px';
}

/**
 * This function sets an object called "users" to the backend which is called "users" and redirected to the index.html
 * 
 */
async function successfullRegistrated() { // kurz genug
    pushUserInArray();
    await setItem('users', JSON.stringify(users));
    showSuccessfullyRegistradedPopup();
    setTimeout(() => {
        resetForm();
        window.open("index.html", "_self");
    }, 1000);
}

/**
 * This function pushes an object into the "users" array.
 * 
 * @returns 
 */
function pushUserInArray() { // kurz genug / nicht anders möglich?
    return users.push({
        currentUserId: users.length + 1,
        "tasks": [
            {
                "toDo": [],
                "inProgress": [],
                "awaitFeedback": [],
                "done": []
            }
        ],
        contacts:[],
        userName: userName.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value
        });
}
 
/**
 * This function shows up a popup for successfully registration.
 * 
 */
function showSuccessfullyRegistradedPopup() { // kurz genug
    let popUp = document.getElementById('animationSignUp');
    popUp.classList.add('show'); // Füge die Klasse .show hinzu, um den Container anzuzeigen
    setTimeout(function() {
        popUp.classList.remove('show'); // Entferne die Klasse .show nach einer gewissen Zeit, um den Container auszublenden
    }, 1000); // Anpassen Sie die Zeit in Millisekunden nach Bedarf
}


/**
 * This function resets the input fields.
 * 
 */
function resetForm() { // kurz genug
    userName.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    password.style.border = '';
    confirmPassword.style.border = '';
    changeCheckbox();
}

