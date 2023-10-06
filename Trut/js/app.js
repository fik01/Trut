let session = new Session()
session = session.getSession()

if(session !== "") {
    window.location.href = "trut.html"
}

let registerBtn = document.querySelector('#registerBtn')

registerBtn.addEventListener("click", function() {
    document.querySelector('.custom-modal').style.display = 'block'
})

let closeModal = document.querySelector('#closeModal')

closeModal.addEventListener("click", function() {
    document.querySelector('.custom-modal').style.display = 'none'
})

let config = {
    'username': {
        required: true,
        minlength: 3,
        maxlength: 50
    },
    'email': {
        required: true,
        email: true,
        minlength: 5,
        maxlength: 50
    },
    'password': {
        required: true,      
        minlength: 7,
        maxlength: 25,
        matching: 'passwordAgain'
    },
    'passwordAgain': {
        required: true,
        minlength: 7,
        maxlength: 25,
        matching: 'password'
    }
}

let validator = new Validator(config, '#registrationForm')
let registrationForm = document.querySelector('#registrationForm')

registrationForm.addEventListener("submit", function(event) {
    event.preventDefault() /* da se page ne reload-uje kad se registrujemo */

    if(validator.validationPassed()) {
        let user = new User()
        user.username = document.querySelector('#registerUsername').value
        user.email = document.querySelector('#registerEmail').value
        user.password = document.querySelector('#registerPassword').value
        user.create()
    } 
})

let loginForm = document.querySelector('#loginForm')

loginForm = addEventListener("submit", function(event) {
    event.preventDefault()

    let email = document.querySelector('#loginEmail').value
    let password = document.querySelector('#loginPassword').value

    let user = new User()
    user.email = email
    user.password = password
    user.login()
})