function signup() {
    password = document.getElementById('InputPassword');
    confirmpassword = document.getElementById('InputConfirmPassword');
    email = document.getElementById('signupEmail');

    if ((password.value).length < 8) {
        alert("Password length must be 8 characters or longer.");
    } else {
        if ((password.value) == (confirmpassword.value)) {
            // btoa(email + ":" + password);
            // fetch("http://127.0.0.1:6263/CreateAccount/" + btoa(email + ":" + password))
            //     .then(response => {console.log(response.data)})
            localStorage.setItem("Account", JSON.stringify(sha256(email + ":" + password)))
            localStorage.setItem("is-signedin", false)
            alert("Sign up successfully.")
            window.location = "./login.html";
        } else {
            alert("Confirm password doesn't meet.")
        }
    }
}