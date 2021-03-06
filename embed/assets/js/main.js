var rightKeys = [];
var rightKey;
var ok;

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-119417406-7');


//-------------------------------------------------------------------------------------------------//   
//  _    _ _____  _____       _______ ______   __  __          _   _          _____ ______ _____   //
// | |  | |  __ \|  __ \   /\|__   __|  ____| |  \/  |   /\   | \ | |   /\   / ____|  ____|  __ \  //
// | |  | | |__) | |  | | /  \  | |  | |__    | \  / |  /  \  |  \| |  /  \ | |  __| |__  | |__) | //
// | |  | |  ___/| |  | |/ /\ \ | |  |  __|   | |\/| | / /\ \ | . ` | / /\ \| | |_ |  __| |  _  /  //
// | |__| | |    | |__| / ____ \| |  | |____  | |  | |/ ____ \| |\  |/ ____ \ |__| | |____| | \ \  //
//  \____/|_|    |_____/_/    \_\_|  |______| |_|  |_/_/    \_\_| \_/_/    \_\_____|______|_|  \_\ //
//                                                                                                 //
//-------------------------------------------------------------------------------------------------//          

for(var i=0; i < 10; i++){
    setTimeout(function() {
		var checkKey = APIKeys[Math.floor(Math.random()*APIKeys.length)];
		$.getJSON('https://www.googleapis.com/youtube/v3/videos?part=statistics&id=hHW1oY26kxQ&key='+checkKey, function() {
		if (rightKeys.includes(checkKey)) {
			console.log("Tried to add key that already exists in array! Returning...")
			return;
		} else {
			rightKeys.push(checkKey)
			console.log("Valid key! Added to array, trying more...")
		}
		}).fail(function() {
			if (rightKeys.includes(checkKey)) {
				rightKeys.pop(checkKey)
				console.log("Invalid key detected in array, removing it...")
			}
			console.log("Invalid key, retrying...")
	  })
	}, 1)
}

setInterval(function() {
	var checkKey = APIKeys[Math.floor(Math.random()*APIKeys.length)];
	$.getJSON('https://www.googleapis.com/youtube/v3/videos?part=statistics&id=hHW1oY26kxQ&key='+checkKey, function() {
	if (rightKeys.includes(checkKey)) {
		console.log("Tried to add key that already exists in array! Returning...")
		return;
	} else {
		rightKeys.push(checkKey)
		console.log("Valid key! Added to array, trying more...")
	}
	}).fail(function() {
		if (rightKeys.includes(checkKey)) {
			rightKeys.pop(checkKey)
			console.log("Invalid key detected in array, removing it...")
		}
		console.log("Invalid key, retrying...")
  })

  var rightKey = rightKeys[Math.floor(Math.random()*rightKeys.length)];


    $.getJSON('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' + user + '&key=' + rightKey, function(data) {
        $.getJSON('https://api.livecounts.io/yt_subs', function(data2) {
			var result = data2.filter(x => x.cid === user);
			if (result.length != 0) {
				document.querySelector("#odometer").innerHTML = result[0].subscriberCount;
            } else {
				document.querySelector("#odometer").innerHTML = data.items[0].statistics.subscriberCount;
            }
        })
    });

    if (!ok) {
        if (rightKeys) {
	$.getJSON('https://www.googleapis.com/youtube/v3/channels?id=' + user + '&part=snippet&key=' + rightKey, function(data) {
                document.getElementById("name").innerHTML = data.items[0].snippet.title;
                var image = document.querySelector('#user_pic');
                image.src = data.items[0].snippet.thumbnails.default.url
    })
        }
    }
	
}, 2000);

//---------------------------------------------------------------//
//  ______ _    _ _   _  _____ _______ _____ ____  _   _  _____  //
// |  ____| |  | | \ | |/ ____|__   __|_   _/ __ \| \ | |/ ____| //
// | |__  | |  | |  \| | |       | |    | || |  | |  \| | (___   //
// |  __| | |  | | . ` | |       | |    | || |  | | . ` |\___ \  //
// | |    | |__| | |\  | |____   | |   _| || |__| | |\  |____) | //
// |_|     \____/|_| \_|\_____|  |_|  |_____\____/|_| \_|_____/  //
//                                                        		 //
//---------------------------------------------------------------//                                                            

var user = "";
var key = "";

if (getUrlVars()["t"] == "1") {
	document.getElementById('style').href='../../../assets/global/odometer-fast.css';
}

if (getUrlVars()["o"] == "1" && getUrlVars()["t"] == "1") {
    $('head').append('<link rel="stylesheet" type="text/css" href="assets/css/odometer-2.css">');
    document.getElementById('style').href='../../../assets/global/odometer-fast.css';
}

if (getUrlVars()["o"] == "1") {
	document.getElementById('style').href='../../../assets/global/odometer-fast.css';
}


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value
    });
    return vars
}

if (!getUrlVars()["c"]) {
    $(document).ready(function() {
        if (window.location.href.indexOf("?") > -1) {
            history.pushState(null, '', window.location.href + '&c=' + user);
        } else {
            history.pushState(null, '', window.location.href + '?c=' + user);
        }
    });
}

if (!getUrlVars()["o"]) {
	$(document).ready(function() {
        if (window.location.href.indexOf("?") > -1) {
            history.pushState(null, '', window.location.href + '&o=0');
        } else {
            history.pushState(null, '', window.location.href + '?o=0');
        }
    });
}

if (!getUrlVars()["c"]) {
	user = "UCaEk4apVOqy-sFVh3xnpJyw";
} else {
	user = getUrlVars()["c"];
}