chrome.storage.sync.get(['auth_Tokan'], function (result) {
//    var millisecondsToWait = 5000;
 //   setTimeout(function () {
        listArticles("https://ejjaz.bishtawi.me/api/articles", result).then(function (response) {

            console.log("getData", response); // returns 200
            if (response.status == 200) {
                console.log(response.status)
                checkContnet(response.data)
            }
        }).catch(err => {
            console.log(err.message)
        });
    // millisecondsToWait);


});
document.addEventListener('DOMContentLoaded', function () {
    var symbutton = document.getElementById('symbutton');
    var gotoSymmPage = document.getElementById('gotoSymmPage');
    var gotoSymmPageIcon = document.getElementById('gotoSymmPageIcon');
    var logout = document.getElementById('logout');

        symbutton.addEventListener('click', function () {
            savebuttons();
        });
        gotoSymmPage.addEventListener('click', function () {
            gotoSymmPages();
        });
        gotoSymmPageIcon.addEventListener('click', function () {
            gotoSymmPages();
        });
        logout.addEventListener('click', function () {
            logouts();
        });
});
function gotoSymmPages() {
    Swal.fire({
        icon: 'error',
        title: 'Service Not Available',
        text: 'The summarize feature is disabled by the admin for now it will be activated shorlty',
        confirmButtonColor: '#ffc107',
      })
    }
function savebuttons() { 
    var x
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
    function(tabs){
      // alert(tabs[0].url);
       x = tabs[0].url;
       console.log(tabs[0].url)
    }
 ); 
 chrome.storage.sync.get(['auth_Tokan'], function (result) {
    const data = { selectedType: 'URL'  , url : x};
    var test = getData("https://ejjaz.bishtawi.me/api/articles", result , data)
    test.then(function (response) {
        console.log("getData", response.status); // returns 200
        if (response.status == 200){
            pipsweetAlert()
            console.log("saved")
            response.blob().then(function (myBlob) {
                var objectURL = URL.createObjectURL(myBlob);
                myImage.src = objectURL;
            });
        }
    }).catch(err=>{
        console.log(err.message)
    });
   
});
}
function pipsweetAlert(){
    
    let timerInterval
    Swal.fire({
      title: 'Adding article...',
      timer: 7000,
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
            title: 'Article Added successfully',
            confirmButtonColor: '#ffc107',
        });
        if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
}  
document.addEventListener('DOMContentLoaded', function () {
    chrome.windows.getCurrent(function (currentWindow) {
        chrome.tabs.query({ active: true, windowId: currentWindow.id }, function (activeTabs) {
            // inject content_script to current tab
            chrome.tabs.executeScript(activeTabs[0].id, { file: 'content_script.js', allFrames: false });
        });
    });
});

function sendURL() {
    console.log("URL")
}
function changeTab() {
    console.log("changeTab");
    chrome.browserAction.onClicked.addListener(function () {
        chrome.tabs.create({ 'index.html': "chrome://newtab" })
    });
}

function log(txt) {
    var h = $("#log").html();
    $("#log").html(h + "<br>" + txt);
}
chrome.browserAction.onClicked.addListener(function () {
    log("hello");
});
chrome.browserAction.onClicked.addListener(function (tab) { alert('icon clicked') });


function getData(url, token , data) {
    // Default options are marked with *
    let bearer = 'Bearer ' + token.auth_Tokan;
    const promis = fetch(url, {
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
        body: JSON.stringify(data) 
    })
    return promis; // parses JSON response into native JavaScript objects
}
function listArticles(url , token) {
    let bearer = 'Bearer ' + token.auth_Tokan
    let i = 0 ;
    const headers = {
        'Content-Type': 'application/json',
        'Accept': bearer,
        'Authorization': bearer,
        'Access-Control-Allow-Origin': '*',
    }
    axios.get(url, {
        headers: headers
      })
      .then((response) => {
        console.log(token.auth_Tokan)
        let data = response.data
        if(data.length > 0) { 
            for ( i = 0; i < data.length && i<3; i++) {
                console.log("data[i]",data[i])
                console.log('article'+(i+1))
                document.getElementById('article'+(i+1)).innerHTML=data[i].title;
                document.getElementById('url'+(i+1)).href = 'https://ejjaz.bishtawi.me/dashboard/editor/'+data[i].id;
            }
            if (i == 1){
                document.getElementById('icon2').style.display='none';
            }
            if(i==2){
                document.getElementById('icon3').style.display='none';
            }
        }
        else {
            document.getElementById('icon1').style.display='none';
            document.getElementById('icon2').style.display='none';
            document.getElementById('icon3').style.display='none';
            document.getElementById('hello').style.display='inline';
            document.getElementById('hello').innerHTML="You Don't have any article yet :( ";
        }
      })
      .catch((error) => {
       console.log(error)
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
        console.log("log out")
    });
});
}

