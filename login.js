chrome.storage.sync.get(['auth_Tokan'], function (result) {
    var millisecondsToWait = 5000;
 //   setTimeout(function () {
        getData("https://ejjaz.bishtawi.me/api/user", result).then(function (response) {

            console.log("getData", response); // returns 200
            if (response.status == 200) {
                window.location.replace("index.html")
                response.blob().then(function (myBlob) {
                    var objectURL = URL.createObjectURL(myBlob);
                    myImage.src = objectURL;
                });
            }
        }).catch(err => {
            console.log(err.message)
        });
    // millisecondsToWait);


});

document.addEventListener('DOMContentLoaded', function () {
    var btn_check = document.getElementById('btn_check')
    var signup = document.getElementById('signup');
    // console.log(symbutton.value)
    // onClick's logic below:
    btn_check.addEventListener('click', function () {
        checkCurrentTab();
    });
    signup.addEventListener('click', function () {
        rsgister();
    });

});
function rsgister(){
document.location.replace("signup.html")
}
function checkCurrentTab() {
    //  document.querySelector('html').innerHTML = '<html><head><title></title><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><script src="popup.js"></script><link rel="stylesheet" type="text/css" href="index.css"></head><body></body><div id="border"><div id="border1"><table><tr> <th> <h3 id="Ejjaz">Ejjaz</h3></th><th> <h3> Welcom User <i class="fa fa-user-circle-o" style="font-size:30px"></i></h3></th></tr>	</div> <tr><th><div id="border2"><p id="p"> Latest Document </p><br><div id="h2"><i class="fa fa-info-circle" style="font-size:24px;color: gray"></i>Article Title</div><div id="subtitle"> Lorem ipusem dolres pisma</div><br><div id="h2"><i class="fa fa-info-circle" style="font-size:24px;color: gray"></i>Article Title</div><div id="subtitle"> Lorem ipusem dolres pisma</div><br><div id="h2"><i class="fa fa-info-circle" style="font-size:24px;color: gray"></i>Article Title</div><div id="subtitle"> Lorem ipusem dolres pisma</div><br><div id="h2"><i class="fa fa-info-circle" style="font-size:24px;color: gray"></i>Article Title</div><div id="subtitle"> Lorem ipusem dolres pisma</div></div></th><th><div id="border3"><div id="statistics"><p id="p"> statistics</p><div id="statis"> 3200 </div><p id="p"> Word Translate </p></div><div id="divbutton"><button id="symbutton" type="submit"> Summrise this page </button></div></div></th></tr></table><br><div id="border5"><table><tr> <th> <i class="fa fa-home" style="font-size:36px"></i></th><th> <i class="fa fa-gear" style="font-size:36px"></i></th><th> <i class="fa fa-sign-out" style="font-size:36px"></i></th></tr>	</div> </div></body></html>'

    chrome.browserAction.onClicked.addListener();
    var result;
    var x = document.getElementById("user").value;
    var y = document.getElementById("pass").value;

    axios.post('https://ejjaz.bishtawi.me/api/auth/login ', {
        'email': x,
        'password': y,
    })
        .then(function (response) {
            let token = response.data;
            chrome.storage.sync.set({ "auth_Tokan": token.token_data.access_token }, function () { });
            console.log("clicked1")
            if (response.status == 200) {
                let timerInterval
                Swal.fire({
                  title: 'Log on',
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
                  /* Read more about handling dismissals below */
                  window.location.replace("index.html")
                  if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                  }
                })                
            }
            else {
                console.log("Incorrect");
                alert("Password Or Username incorrect");
            }
            chrome.storage.sync.get(['auth_Tokan'], function (result) {
                console.log(result.auth_Tokan);
            });
        })
        .catch(function (error) {
            log(error.message);
        });

}

function getData(url, token) {
    // Default options are marked with *
    let bearer = 'Bearer ' + token.auth_Tokan
    return fetch(url, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': bearer,
            'Accept':"application/json",
        },
    })

}