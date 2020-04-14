//Set up page when window has loaded
window.onload = init;

//Get pointers to parts of the DOM after the page has loaded.
function init() {
    userLogin();
    ownerLogin();
}

//User Login
function userLogin() {
    //Create request object
    let request = new XMLHttpRequest();

    let userPassword = document.getElementById("passWord").value;
    let existingUsername = document.getElementById("existingUsername").value;

    let userLogin = {
        user_name: existingUsername,
        user_password: userPassword
    }

    request.open("POST", "/userLogin", true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(userLogin));
}

//Owner Login
function ownerLogin() {
    //Create request object
    let request = new XMLHttpRequest();

    //Extract data
    let ownerEmail = document.getElementById("owner_email").value;
    let ownerPassword = document.getElementById("owner_password").value;

    let ownerLogin = {
        owner_email: ownerEmail,
        owner_password: ownerPassword
    }

    request.open("POST", "/ownerLogin", true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(ownerLogin));
}

//Validate user login
function validateuserLogin(){
    if (document.userLoginForm.uname.value === "") {
        alert("Please provide your username");
        document.userLoginForm.uname.focus();
        return false;
    }

    if (document.userLoginForm.psw.value === "") {
        alert("Please provide your password");
        document.userLoginForm.psw.focus();
        return false;
    }
}

//Validate owner login
function validateOwnerLogin(){
    if (document.ownerLoginForm.email.value === "") {
        alert("Please provide your email");
        document.ownerLoginForm.email.focus();
        return false;
    }

    if (document.ownerLoginForm.psw.value === "") {
        alert('Please provide your password');
        document.ownerLoginForm.psw.focus();
        return false;
    }
}