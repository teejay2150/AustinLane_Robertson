let userData = JSON.parse(localStorage.getItem('UserData')) || [];
let userStorageArray = [];

userData.forEach(existingUser => {
    addRowToTable(existingUser);
});

function User(username, firstName, lastName) {
    this.id = Math.floor(Math.random() * 100);
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
}

function ExistingUser(id, username, firstName, lastName) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
}

function addRowToTable(userToAdd) {
    const tblBody = document.getElementById('existing-users-table').getElementsByTagName('tbody')[0];
    const newRow = tblBody.insertRow();
    newRow.setAttribute('data-id', userToAdd.id);

    const cellUserName = newRow.insertCell(0);
    const cellFirstName = newRow.insertCell(1);
    const cellLastName = newRow.insertCell(2);
    const cellRemove = newRow.insertCell(3);

    cellUserName.textContent = userToAdd.username;
    cellFirstName.textContent = userToAdd.firstName;
    cellLastName.textContent = userToAdd.lastName;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    removeButton.addEventListener('click', () => removeRow(userToAdd.id));
    cellRemove.appendChild(removeButton);
}

// Step 3 - allow users to be deleted
function removeRow(user) {
    const table = document.getElementById('existing-users-table');
    const rows = table.getElementsByTagName('tr');

    for (let i=1; i< rows.length; i++) {
        if (rows[i].getAttribute('data-id') == user) {
            table.deleteRow(i);
            break;
        }
    }
}

window.addEventListener("load", function () {
    document.getElementById("submit").addEventListener("click", function() {
        // If we have any previous data, refresh the screen
        userData.forEach(user => {
            addRowToTable(user);
            // Since we need to store it an array (requirement), let's do that here
            userStorageArray.push(user);
        })

        // Step 1. Create a User object and fill it in based on form fields
        // Alert if username is not given
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const username = document.getElementById('username').value;

        if (username == '')
        {
            alert('User name must not be blank.');
            return;
        }

        // Step 2. Inject into the current existing-users-area table
        const myUser = new User(username, firstName, lastName);

        addRowToTable(myUser);
        userStorageArray.push(myUser);

        // Some clean up to make it easier to enter multiple users
        var allInputs = document.querySelectorAll('input');
        allInputs.forEach(input => input.value='');
    });
})