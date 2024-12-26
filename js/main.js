
var signUpForm = document.getElementById("registerForm");
var signName = document.getElementById("signName");
var signEmail = document.getElementById("signEmail");
var signPassword = document.getElementById("signPassword");
var nameAlert = document.getElementById("nameAlert");
var emailAlert = document.getElementById("emailAlert");
var passwordAlert = document.getElementById("passwordAlert");
var successAlert = document.getElementById("successAlert");
var existAlert = document.getElementById("existAlert");
var allUsers = [];

if (localStorage.getItem('allUsers') != null) {
    allUsers = JSON.parse(localStorage.getItem('allUsers'))
}


signUpForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (checkAllInputsAreTrue()) {
        addUser();
    }
})


function addUser() {
    var newUser = {
        name: signName.value,
        email: signEmail.value,
        password: signPassword.value,
    }
    if (checkExistEmail(newUser) == true) {
        existAlert.classList.remove("d-none")
        signEmail.classList.add("is-invalid");
        signEmail.classList.remove("is-valid");
        successAlert.classList.add("d-none")
    } else {
        signEmail.classList.add("is-valid");
        signEmail.classList.remove("is-invalid");
        existAlert.classList.add("d-none")
        successAlert.classList.remove("d-none")
        allUsers.push(newUser);
        console.log(allUsers);
        localStorage.setItem('allUsers', JSON.stringify(allUsers))
    }

}

function checkExistEmail(newUser) {
    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].email.toLowerCase() == newUser.email.toLowerCase()) {
            console.log("alert")
            return true;
        }
    }
}


//       validation     //
function validateName() {
    var regex = /^[A-Za-z]{2,}([ '-][A-Za-z]{2,})*$/

    if (regex.test(signName.value)) {
        signName.classList.add("is-valid");
        signName.classList.remove("is-invalid");
        nameAlert.classList.add("d-none")
        successAlert.classList.remove("d-none")
        return true;
    } else {
        signName.classList.add("is-invalid");
        signName.classList.remove("is-valid");
        nameAlert.classList.remove("d-none")
        successAlert.classList.add("d-none")
        return false;
    }
}
function validateEmail() {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (regex.test(signEmail.value)) {
        signEmail.classList.add("is-valid");
        signEmail.classList.remove("is-invalid");
        emailAlert.classList.add("d-none")
        existAlert.classList.add("d-none")
        return true;
    } else {
        signEmail.classList.add("is-invalid");
        signEmail.classList.remove("is-valid");
        emailAlert.classList.remove("d-none")
        successAlert.classList.remove("d-none")
        return false;
    }
}
function validatePassword() {
    var regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if (regex.test(signPassword.value)) {
        signPassword.classList.add("is-valid");
        signPassword.classList.remove("is-invalid");
        passwordAlert.classList.add("d-none")
        successAlert.classList.remove("d-none")
        return true;
    } else {
        signPassword.classList.add("is-invalid");
        signPassword.classList.remove("is-valid");
        passwordAlert.classList.remove("d-none")
        successAlert.classList.add("d-none")
        return false;
    }
}
function checkAllInputsAreTrue() {
    if (validateName() == true && validateEmail() == true && validatePassword() == true) {
        return true;
    }
    else {
        return false;
    }
}

