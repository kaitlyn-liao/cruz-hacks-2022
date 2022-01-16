// background scripting

// chrome.runtime.onInstalled.addListener(function() { alert("Check-In Chicken is installed!"); });

var showpageID = "";
function set_showpageID(p){
    showpageID = p;
}

// ====================================================================== TIMERS
// globals
var alarmRingTimeout;
var user_timer_seconds = null;
var work_duration;
var break_duration;
var is_paused = false;
var is_working = null;

function set_work_duration(time) {
    work_duration = time * 1000;
}

function set_break_duration(time){
    break_duration = time* 1000;
}

function set_alarm(w){
    is_working = w
    var tMillis;
    if(is_working)  { tMillis = work_duration; }
    else            { tMillis = break_duration; }
    ringIn(tMillis);
}

function kill_alarm(){
    user_timer_seconds = 0;
    work_duration = 0;
    break_duration = 0;
    is_paused = false;
    is_working = null;
    clearInterval(alarmRingTimeout);
}

function pause(){
    is_paused = true;
}

function resume(){
    is_paused = false;
}

function ringIn(tMillis){
    var tSecs = parseInt(tMillis / 1000);
    user_timer_seconds = tSecs

    alarmRingTimeout = setInterval( 
        function(){
            if(!is_paused){
                console.log(is_paused);
                console.log(user_timer_seconds);
                if(user_timer_seconds > 0){ user_timer_seconds--; }
                else { ring(); }
            }
        }, 1000);
}

function ring(){
    alert("ring ring ring ring")
    turnOff();
}

function turnOff(){
    clearInterval(alarmRingTimeout);
    // clearInterval(updateBadgeTextInterval);
    user_timer_seconds = 0;

    set_alarm(!is_working)
}