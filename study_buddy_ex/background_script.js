// background scripting

// globals
var alarmRingTimeout;
var user_timer_duration;
var user_timer_seconds = null;
var lag = 0; //500

var work_duration;
var break_duration;
var is_working;

chrome.runtime.onInstalled.addListener(function() { alert("Check-In Chicken is installed!"); });

function set_work_duration(time) { work_duration = time * 1000; }
function set_break_duration(time){ break_duration = time* 1000; }

function set_alarm(w){
    is_working = w
    var tMillis;
    if(is_working)  { tMillis = work_duration; }
    else            { tMillis = break_duration; }
    // user_timer_duration = tMillis;
    ringIn(tMillis + lag);
}

function ringIn(tMillis){
    // alert(tMillis);
    var tSecs = parseInt(tMillis / 1000);
    var tMins = parseInt(tSecs / 60);
    // var secs = tSecs % 60;
    // var tHrs = parseInt(tMins / 60);
    // var mins = tMins % 60;
    // var millis = tMillis % 1000;

    user_timer_duration = user_timer_seconds = tSecs

    // alert('alarm started for ' + user_timer_duration);
    alarmRingTimeout = setInterval( 
        function(){
            if(user_timer_seconds > 0){ user_timer_seconds--; }
            else { ring(); }
        }, 1000);
}

function ring(){
    alert("ring ring ring ring")
    turnOff();
}

function turnOff(){
    clearInterval(alarmRingTimeout);
    // clearInterval(updateBadgeTextInterval);
    user_timer_duration = 0;
    user_timer_seconds = 0;

    set_alarm(!is_working)
}