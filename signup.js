
document.addEventListener('DOMContentLoaded', function () {
    var login = document.getElementById('login')
    var signup = document.getElementById('signup');
    // console.log(symbutton.value)
    // onClick's logic below:
    login.addEventListener('click', function () {
        logins();
    });
    signup.addEventListener('click', function () {
        rsgister();
    });

});
function logins(){
document.location.replace("login.html")
}
function rsgister(){
    chrome.browserAction.onClicked.addListener();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    var cpass = document.getElementById("Cpass").value;
    var isValidEmail = validateEmail(email)
    var isValidName = true;
    var isValidPassword = true;
    var isAcceptTerms = true;
    if(name.length < 3){
        Swal.fire({
            icon: 'error',
            title: 'Invalid Name',
            text: 'The display Name field must be at least 3 characters',
            confirmButtonColor: '#ffc107',
          })
          isValidName = false;
    }
    else if(! isValidEmail) { 
        Swal.fire({
            icon: 'error',
            title: 'Invalid E-mail',
            text: 'Please enter a valid email address',
            confirmButtonColor: '#ffc107',
          })
    }
    else if (pass != cpass){
        Swal.fire({
            icon: 'error',
            title: 'Wrong Password',
            text: 'password and confirm password not matched',
            confirmButtonColor: '#ffc107',
          })
          isValidPassword = false;
    }
    else if (pass.length < 6){
        Swal.fire({
            icon: 'error',
            title: 'Wrong Password',
            text: 'The password field must be at least 6 characters',
            confirmButtonColor: '#ffc107',
          })
          isValidPassword = false;
    }
    else if (pass.length > 10){
        Swal.fire({
            icon: 'error',
            title: 'Wrong Password',
            text: 'Password cannot be longer than 10 characters',
            confirmButtonColor: '#ffc107',
          })
          isValidPassword = false;
    }
    else if (! exampleCheck1.checked){
        Swal.fire({
            icon: 'error',
            title: 'Oops....',
            text: 'Please accept the terms and conditions to Continue',
            confirmButtonColor: '#ffc107',
          })
          isAcceptTerms = false;
    }
    if(isValidPassword && isValidEmail && isValidName && isAcceptTerms)
        sendRegister(name , email , pass , cpass);
}
function sendRegister(name , email , pass , cpass){
    axios.post('https://ejjaz.bishtawi.me/api/auth/register', {
        'name': name,
        'email': email,
        'password': pass,
        'c_password': cpass,
    })
        .then(function (response) {
            pipsweetAlert();
        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Somrthing Wrong',
                text: 'Please Try Again',
                confirmButtonColor: '#ffc107',
              }).then(function() {
                window.location.replace("login.html")
            });
        });
}
function pipsweetAlert(){
    
    let timerInterval
    Swal.fire({
      title: 'Registration...',
      timer: 5000,
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getContent()
          if (content) {
            const b = content.querySelector('b')
            if (b) {
              b.textContent = Swal.getTimerLeft()
            }
          }
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
        Swal.fire({
            icon: 'success',
            title: 'Your account create successfully',
            confirmButtonColor: '#ffc107',
        });
        if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
} 
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}