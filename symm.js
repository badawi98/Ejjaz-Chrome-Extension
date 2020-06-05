console.log("Symmm")
document.addEventListener('DOMContentLoaded', function () {
    var logout = document.getElementById('logout');

    var gotoIndex = document.getElementById('gotoIndex');
    gotoIndex.addEventListener('click', function () {
        gotoIndexPage();
        });
    logout.addEventListener('click', function () {
        logouts();
        });
});
function gotoIndexPage() {
    window.location.replace("index.html")
}
function lll(){
    Swal.fire({
        icon: 'success',
        title: 'Good Byte',
      })
}
function logouts(){
    chrome.storage.sync.get(['auth_Tokan'], function (result) {
        //    var millisecondsToWait = 5000;
         //   setTimeout(function () {
               
        
        
    let bearer = 'Bearer ' + result.auth_Tokan;
    const promis = fetch('https://ejjaz.bishtawi.me/api/user/logout', {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': bearer,
            'Accept':"application/json",
            "Content-Type":"application/json"
        },
    }).then((response) => {
        Swal.fire({
            icon: 'success',
            title: 'Good Bye',
            confirmButtonColor: '#ffc107',
        }).then(function() {
            window.location.replace("login.html")
        });
      //  window.location.replace("login.html")
     //   console.log("log out")
    });
});
}
