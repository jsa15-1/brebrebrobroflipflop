function SignIn() {
    var Email = document.getElementById('InputEmail').value;
    var Password = document.getElementById('InputPassword').value;
    var EmailPasswordCombination = sha256(Email + ":" + Password)

    // fetch("127.0.0.1:5253/Login/" + EmailPasswordCombination)
    //     .then(response => {console.log(response.data)})

    // if (JSON.parse(response)) {
        
    // }

    if (EmailPasswordCombination == localStorage.getItem('auth')) {
        
    }
}