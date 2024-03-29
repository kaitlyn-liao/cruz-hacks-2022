// background scripting

// chrome.runtime.onInstalled.addListener(function() { alert("Check-In Chicken is installed!"); });

var showpageID = "";
function set_showpageID(p){
    showpageID = p;
}

// ====================================================================== TIMERS
// globals
var lag = 5;
var alarmRingTimeout;
var user_timer_seconds = null;
var work_duration;
var break_duration;
var is_timing = false;
var is_paused = false;
var is_study = false;


function set_is_timing(t) {
    is_timing = t;
}

function set_is_study(t){
    is_study = t;
}

function set_work_duration(time) {
    work_duration = time * 1000;
}

function set_break_duration(time){
    break_duration = time* 1000;
}

function set_alarm(w){
    clearInterval(alarmRingTimeout);
    set_is_study(w);
    set_is_timing(true);
    var tMillis;
    if(is_study)  { tMillis = work_duration; }
    else            { tMillis = break_duration; }
    ringIn(tMillis + lag);
}

function kill_alarm(){
    user_timer_seconds = 0;
    work_duration = 0;
    break_duration = 0;
    is_paused = false;
    is_study = false;
    is_timing = false;
    is_vibing = false;
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
            if(!is_paused || is_vibing){
                console.log(is_paused);
                console.log(user_timer_seconds);
                if(user_timer_seconds > 0){ user_timer_seconds--; }
                else { ring(); }
            }
        }, 1000);
}

function ring(){
    if(showpageID == "time_page"){
        alert("Study time is over! Good Work!");
        turnOff();
    }
}

function turnOff(){
    clearInterval(alarmRingTimeout);
    user_timer_seconds = 0;

    set_is_timing(false)
    if(is_study == true){ set_is_vibing(true); }
    else{
        set_is_vibing(false);
        set_is_study(!is_study);
        set_alarm(is_study);
    }

}

// ====================================================================== VIBE CHECK
var is_vibing = false;
var vibe = "";

function set_is_vibing(v){
    is_vibing = v;
}

function set_vibe(v){
    vibe = v;
}