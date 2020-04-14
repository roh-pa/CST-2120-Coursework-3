//Set up page when window has loaded
window.onload = init;

//Get pointers to parts of the DOM after the page has loaded.
function init() {
    storeNewUser();
    storeNewOwner()
}

/* Posts a new user to the server. */
function storeNewUser() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let newFirstName = document.getElementById("new_first_name").value;
    let newLastName = document.getElementById("new_last_name").value;
    let newUsername = document.getElementById("new_username").value;
    let newEmail = document.getElementById("new_email").value;
    let newAddress = document.getElementById("new_address").value;
    let newPassword = document.getElementById("new_password").value;

    xhttp.open("POST", "/users", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    //Create object with user data
    let usrObj = {
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
        password: newPassword,
        address: newAddress,
        username: newUsername
    };

    //Check empty fields
    if (newFirstName === "" || newLastName === "" || newUsername === "" || newEmail === "" || newPassword === "" || newAddress === "") {
        alert("Please fill up all details");
        return false;
    }

    //Send new user data to server
    xhttp.send(JSON.stringify(usrObj));
}

/* Posts a new restaurant owner to the server. */
function storeNewOwner() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/owners", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    //Extract user data
    let ownerFName = document.getElementById("ownerFName").value;
    let ownerLName = document.getElementById("ownerLName").value;
    let ownerEmail = document.getElementById("ownerEmail").value;
    let ownerNumber = document.getElementById("ownerNumber").value;
    let ownerPassword = document.getElementById("ownerPassword").value;

    let ownerObj = {
        ownerFirstName: ownerFName,
        ownerLastName: ownerLName,
        ownerEmailAdd: ownerEmail,
        ownerPass: ownerPassword,
        ownerPhoneNumber: ownerNumber,
    };

    //Check empty fields
    if (ownerFName === "" || ownerLName === "" || ownerEmail === "" || ownerNumber === "" || ownerPassword === "") {
        alert("Please fill up all details");
        return false;
    }

    xhttp.send(JSON.stringify(ownerObj));
}


function validateRegistration() {
    //Define all variables
    const firstName = document.regForm.firstName.value;
    const lastName = document.regForm.lastName.value;
    const username = document.regForm.uname.value;
    const email = document.regForm.email.value;
    const password = document.regForm.psw.value;
    const repeatPassword = document.regForm.psw_repeat.value;
    const regName = /^[a-zA-Z]+$/;
    const regCheckEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regCheckPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    //Check empty fields
    if (document.regForm.firstName.value === "") {
        alert("Please provide your first name!");
        document.regForm.firstName.focus();
        return false;
    }

    //Validate first name
    if (!regName.test(firstName)) {
        alert('First name must not contain numbers or special symbols');
        return false;
    }

    if (document.regForm.lastName.value === "") {
        alert("Please provide your last name!");
        document.regForm.lastName.focus();
        return false;
    }

    //validate last name
    if (!regName.test(lastName)) {
        alert('Last name must not contain numbers or special symbols');
        return false;
    }

    if (document.regForm.uname.value === "") {
        alert("Please provide your username!");
        document.regForm.uname.focus();
        return false;
    }

    //validate username
    if (!regName.test(username)) {
        alert('Username must contain only words.');
        return false;
    }

    if (document.regForm.email.value === "") {
        alert("Please provide an email!");
        document.regForm.email.focus();
        return false;
    }

    //Validate email
    if (!regCheckEmail.test(email)) {
        alert('Email is not valid. Email must contain @');
        return false;
    }

    if (document.regForm.psw.value === "") {
        alert("Please provide a password!");
        document.regForm.psw.focus();
        return false;
    }

    //Validate password
    if (!regCheckPassword.test(password)) {
        alert('Password must be between 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter');
        return false;
    }

    if (document.regForm.psw_repeat.value === "") {
        alert("Please repeat your password!");
        document.regForm.psw_repeat.focus();
        return false;
    }

    //Validate repeat password
    if (password !== repeatPassword) {
        alert("Passwords do not match.");
        return false;
    }

    if (document.regForm.address.value === "") {
        alert("Please provide an address!");
        document.regForm.address.focus();
        return false;
    }

}


function validateOwnerRegForm() {
    const firstName = document.RegForm.firstName.value;
    const lastName = document.RegForm.lastName.value;
    const email = document.RegForm.email.value;
    const password = document.RegForm.psw.value;
    const repeatPassword = document.RegForm.psw_repeat.value;
    const regName = /^[a-zA-Z]+$/;
    const regCheckEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regCheckPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    //Check empty fields
    if (document.RegForm.firstName.value === "") {
        alert("Please provide your first name!");
        document.RegForm.firstName.focus();
        return false;
    }

    //Validate first name
    if (!regName.test(firstName)) {
        alert('First name must not contain numbers or special symbols');
        return false;
    }

    if (document.RegForm.lastName.value === "") {
        alert("Please provide your last name!");
        document.RegForm.lastName.focus();
        return false;
    }

    //validate last name
    if (!regName.test(lastName)) {
        alert('Last name must not contain numbers or special symbols');
        return false;
    }

    if (document.RegForm.email.value === "") {
        alert("Please provide an email!");
        document.RegForm.email.focus();
        return false;
    }

    //Validate email
    if (!regCheckEmail.test(email)) {
        alert('Email is not valid. Email must contain @');
        return false;
    }

    if (document.RegForm.psw.value === "") {
        alert("Please provide a password!");
        document.RegForm.psw.focus();
        return false;
    }

    //Validate password
    if (!regCheckPassword.test(password)) {
        alert('Password must be between 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter');
        return false;
    }

    if (document.RegForm.psw_repeat.value === "") {
        alert("Please repeat your password!");
        document.RegForm.psw_repeat.focus();
        return false;
    }

    //Validate repeat password
    if (password !== repeatPassword) {
        alert("Passwords do not match.");
        return false;
    }

    if (document.RegForm.phoneNumber.value === "") {
        alert("Please provide a contact number!");
        document.RegForm.phoneNumber.focus();
        return false;
    }
}