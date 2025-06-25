const STORAGE_TOKEN = 'YM60FTKVC9CBFE5XW9O1JLLZFXHVPE9YQDQ3YUUP';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
let currentUser = [];
let contactData = [];

/**
 * Sets an item in the storage by sending a POST request to the specified URL.
 * @param {string} key - The key of the item to be stored.
 * @param {any} value - The value of the item to be stored.
 * @returns {Promise<any>} A promise that resolves with the response data from the server.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) }).then(res => res.json());
}

/**
 * Retrieves an item from storage by sending a GET request to the specified URL.
 * @param {string} key - The key of the item to retrieve.
 * @returns {Promise<any>} A promise that resolves with the retrieved value.
 * @throws {string} Throws an error if the item with the specified key is not found.
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}

/**
 * Clears the value associated with the specified key in storage.
 * @param {string} key - The key of the item to clear.
 * @returns {Promise<void>} A promise that resolves when the item is successfully cleared.
 * @throws {Error} Throws an error if there was an issue clearing the item.
 */
async function clearItem(key) {
    return setItem(key, [])
        .then(response => {
        })
        .catch(error => {
            console.error('Fehler beim Leeren des Werts für Schlüssel "' + key + '"', error);
        });
}

/**
 * Resets the value associated with the specified key in storage to a new value.
 * @param {string} key - The key of the item to reset.
 * @param {any} newValue - The new value to set for the item.
 * @returns {Promise<void>} A promise that resolves when the item is successfully reset.
 * @throws {Error} Throws an error if there was an issue resetting the item.
 */
async function resetItem(key, newValue) {
    await clearItem(key);
    await setItem(key, newValue);
}

/**
 * Retrieves the contacts associated with the current user from storage.
 * @function getContacts
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of contact objects.
 * @throws {Error} Throws an error if there was an issue fetching or parsing the contacts data.
 */
async function getContacts() {
    const response = await fetch(`${STORAGE_URL}?key=currentUser&token=${STORAGE_TOKEN}`);
    const result = await response.json();
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    if (result.status !== 'success' || !result.data || !result.data.value) {
        throw new Error('Data is missing or structure is incorrect');
    }
    const currentUser = JSON.parse(result.data.value);
    if (!currentUser.contacts || !Array.isArray(currentUser.contacts)) {
        throw new Error('Contacts data is not an array');
    }
    return currentUser.contacts;
}

/**
 * Saves the updated contacts for the current user to storage.
 * @function saveContacts
 * @param {Array<Object>} contacts - The updated array of contact objects.
 * @returns {Promise<Object>} A promise that resolves with the response data after saving.
 * @throws {Error} Throws an error if there was an issue saving the contacts.
 */
async function saveContacts(contacts) {
    let currentUser = await getCurrentUser();
    currentUser.contacts = contacts;
    const payload = {
        key: 'currentUser',
        value: JSON.stringify(currentUser),
        token: STORAGE_TOKEN
    };
    const response = await fetch(STORAGE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (!response.ok) {
        throw new Error(`Failed to save updated contacts: ${response.status}`);
    }
    return response.json();
}

/**
 * Fetches and returns the current user's data from storage.
 * @function getCurrentUser
 * @returns {Promise<Object>} A promise that resolves with the current user's data.
 * @throws {Error} Throws an error if there was an issue fetching the user data.
 */
async function getCurrentUser() {
    let response = await fetch(`${STORAGE_URL}?key=currentUser&token=${STORAGE_TOKEN}`);
    let result = await response.json();
    if (result.status === 'success' && result.data && result.data.value) {
        return JSON.parse(result.data.value);
    } else {
        throw new Error('Failed to fetch active user');
    }
}

/**
 * Removes a contact from the list of contacts and saves the updated list.
 * @function clearContact
 * @param {string} contactID - The ID of the contact to be removed.
 * @returns {Promise<void>} A promise representing the completion of the operation.
 * @throws {Error} Throws an error if there was an issue updating the contacts.
 */
async function clearContact(contactID) {
    try {
        let contacts = await getContacts();
        let updatedContacts = contacts.filter(contact => contact.id !== contactID);
        await saveContacts(updatedContacts);
    } catch (error) {
        console.error('Error updating contacts:', error);
    }
}

/**
 * Saves the updated user tasks data to the server after loading users and updating the current user data.
 * @function saveUserTasksToServer
 * @returns {Promise<void>} A promise representing the completion of the operation.
 * @throws {Error} Throws an error if there was an issue updating the user tasks.
 */
async function saveUserTasksToServer() {
    await loadUsers();
    if (Array.isArray(contactData) && contactData.length > 0) {
        if (contactData[0].hasOwnProperty('currentUserId')) {
            let userIndex = users.findIndex(user => user.currentUserId === contactData[0].currentUserId);
            if (userIndex !== -1) {
                users[userIndex] = contactData[0];
                await setItem('users', JSON.stringify(users));
                await clearItem('currentUser');
                await setItem('currentUser', JSON.stringify(contactData[0]));
            }
        }
    }
}