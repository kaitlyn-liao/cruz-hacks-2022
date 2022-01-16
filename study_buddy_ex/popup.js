var bgpage = chrome.extension.getBackgroundPage();

// ====================================================================== EVENTS 

document.addEventListener("DOMContentLoaded", function() {
  ev = document.getElementById("time_start");  ev.addEventListener("click", initTimer, false);
  ev = document.getElementById("time_end");    ev.addEventListener("click", killTimer, false);
  ev = document.getElementById("time_resume"); ev.addEventListener("click", resumeTimer, false);
  ev = document.getElementById("time_pause");  ev.addEventListener("click", pauseTimer, false);

  refreshDisplay();
});

// ====================================================================== DISPLAY 

function refreshDisplay(){
  refreshTimer();

  // if(bgpage.is_study == true && bgpage.user_timer_seconds == 0){ vibe_check(); }
  if( (document.getElementById("time").innerHTML == "0:00") && (bgpage.is_vibing == true) ){
    vibe_check();
  }
  // var timeDisplay = document.getElementById("time");
  // timeDisplay.innerHTML = msg;

  if(bgpage.is_study == true)       { document.getElementById("iswork").innerHTML = "Study Time"; }
  else if(bgpage.is_study == false) { document.getElementById("iswork").innerHTML = "Break Time"; }
  if(bgpage.is_timing == false)       { document.getElementById("iswork").innerHTML = "No Timer Set";}

  refreshDisplayTimeout = setTimeout(refreshDisplay, 1000);

  // any other common displays we need to update
}

function hide(id){
    document.getElementById(id).style.display = "none";
}

function show(id){
  document.getElementById(id).style.display = "inline";
}

// ====================================================================== TIMERS
work_sec = 10;
break_sec = 5;

function initTimer(){
  bgpage.set_work_duration(work_sec)
  bgpage.set_break_duration(break_sec)
  startTimer();
}

function startTimer(){
  bgpage.set_alarm(true);
  refreshDisplay();
}

function killTimer(){
  bgpage.kill_alarm();
  refreshDisplay();
}

function pauseTimer(){
    clearTimeout(refreshDisplayTimeout);
    // hide("time_pause");
    // show("time_resume");
    bgpage.pause();
}

function resumeTimer(){
    // hide("time_resume");
    // show("time_pause");
    bgpage.resume();
    refreshDisplay();
}

function refreshTimer(){
  seconds_left = bgpage.user_timer_seconds

  var min = Math.floor(seconds_left/60);
  var sec = seconds_left - (min*60);
  if (sec < 10) { sec = "0" + sec; }
  var msg = min.toString()+":"+sec;

  var timeDisplay = document.getElementById("time");
  timeDisplay.innerHTML = msg;

}

// =================================== VIBE CHECK
vibe = null;

function vibe_check(){
  bgpage.set_is_vibing(true);
  alert("vibe check");

  // prompt user to fill out vibe check
  // take in input response
  // based on input, give suggestions or pos reinforcement 
  // prompt user to start break

  // bgpage.vibe_check();
  bgpage.set_is_vibing(false);
  bgpage.set_is_study(! bgpage.is_study);
  bgpage.set_alarm(bgpage.is_study);
}

