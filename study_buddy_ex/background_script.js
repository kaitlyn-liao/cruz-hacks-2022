// background scripting

chrome.runtime.onInstalled.addListener(function() { alert("Check-In Chicken is installed!"); });

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
    user_timer_seconds = 0;

    set_is_timing(false)
    if(is_study == true){ set_is_vibing(true); }
    else{
        set_is_study(!is_study);
        set_alarm(is_study);
    }

}

// ====================================================================== TIMERS
var is_vibing = false;

function set_is_vibing(v){
    is_vibing = v;
}

// function vibe_check(){
//     // prompt user to fill out vibe check
//     // take in input response
//     // based on input, give suggestions or pos reinforcement 
//     // prompt user to start break
//     // is_timing == true

//     // if(is_timing == true){
//     //     set_alarm(!is_study)
//     // }
//     set_alarm(is_study)
// }