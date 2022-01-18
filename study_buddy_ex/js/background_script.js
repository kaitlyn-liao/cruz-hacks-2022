// background scripting

var showpageID = "";
function set_showpageID(p){
    showpageID = p;
}

function create_notif(){
    if(is_study){
        alert("Your study session is over!")
        chrome.notifications.create('NOTFICATION_ID', {
            type: 'basic',
            iconUrl: "./img/chicken-logo.png",
            title: 'Check-In Chicken: ',
            message: 'Your study session is over! Come back for a mental check-in!',
            priority: 3
        });
    }
    else{
        alert("I hope your break was healthy and relaxing!")
        chrome.notifications.create('NOTFICATION_ID', {
            type: 'basic',
            iconUrl: "./img/chicken-logo.png",
            title: 'Check-In Chicken: ',
            message: "I hope your break was healthy and relaxing! Let's start your next study session!",
            priority: 3
        });
    }
    // alert("did notif")
}

// ====================================================================== TIMERS
// globals
var lag = 5;
var alarmRingTimeout;
var user_timer_seconds = null;
var work_duration = null;
var break_duration = null;
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
    var tMillis;
    if(is_study)    { tMillis = work_duration; }
    else            { tMillis = break_duration; }
    ringIn(tMillis + lag);
}

function kill_alarm(){
    user_timer_seconds = -1;
    work_duration = -1;
    break_duration = -1;
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
            if(!is_paused && !is_vibing){
                console.log(is_paused);
                console.log(user_timer_seconds);
                if(user_timer_seconds > 0){ user_timer_seconds--; }
                else { ring(); }
            }
        }, 1000);
}

function ring(){
    if(showpageID == "time_page"){
        create_notif();
        turnOff();
    }
}

function turnOff(){
    clearInterval(alarmRingTimeout);
    user_timer_seconds = 0;

    set_is_timing(false)
    if(is_study){ 
        set_is_vibing(true);
    }
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