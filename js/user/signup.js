function signup() {
    password = document.getElementById('InputPassword');
    confirmpassword = document.getElementById('InputConfirmPassword');
    email = document.getElementById('signupEmail');

    if ((password.value).length < 8) {
        alert("Password length must be 8 characters or longer.");
    } else {
        if ((password.value) == (confirmpassword.value)) {
            // btoa(email + ":" + password);
            fetch("http://127.0.0.1:6263/CreateAccount/" + btoa(email + ":" + password))
                .then(response => {console.log(response.data)})
                
        } else {
            alert("Confirm password doesn't meet.")
        }
    }
}